const { readFileSync } = require('fs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { join } = require('path');
const { RefreshToken } = require('../models');
const {
  ROOT_DIR,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_ISSUER: issuer,
  JWT_SUBJECT: subject,
  JWT_AUDIENCE: audience
} = require('../config');

const ACCESS_TOKEN_PRIVET_KEY = readFileSync(join(ROOT_DIR, 'access-token.private.key'));
const ACCESS_TOKEN_PUBLIC_KEY = readFileSync(join(ROOT_DIR, 'access-token.public.key'));
const REFRESH_TOKEN_PRIVATE_KEY = readFileSync(join(ROOT_DIR, 'refresh-token.private.key'));
const REFRESH_TOKEN_PUBLIC_KEY = readFileSync(join(ROOT_DIR, 'refresh-token.public.key'));

const options = {
  issuer,
  subject,
  audience,
  algorithm: 'RS256'
};

const signAccessToken = payload =>
  new Promise((resolve, reject) => jwt.sign(
    payload,
    ACCESS_TOKEN_PRIVET_KEY,
    {
      ...options,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN
    }, (err, encoded) => err ? reject(err) : resolve(encoded))
  );

const signRefreshToken = _id =>
  new Promise((resolve, reject) => jwt.sign(
    { _id },
    REFRESH_TOKEN_PRIVATE_KEY,
    {
      ...options,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN
    }, (err, encoded) => err ? reject(err) : resolve(encoded))
  );

const verifyAccessToken = token =>
  new Promise((resolve, reject) => jwt.verify(
    token,
    ACCESS_TOKEN_PUBLIC_KEY,
    options,
    (err, decoded) =>
      err ?
        reject(
        err.name === 'TokenExpiredError' ?
          createError(403, 'access token expired') :
          createError(400, 'invalid access token')
        ) :
        resolve(decoded)
  ));

const verifyRefreshToken = token =>
  new Promise((resolve, reject) => jwt.verify(
    token,
    REFRESH_TOKEN_PUBLIC_KEY,
    options,
    (err, decoded) => {
      if (err) {
        reject(
          err.name === 'TokenExpiredError' ?
            createError(401, 'refresh token expired') :
            createError(400, 'invalid refresh token')
        );
      } else {
        const user = decoded._id;
        RefreshToken.findOne({ user, value: token }, (err, doc) => {
          if (err || !doc) reject(createError(400, 'invalid refresh token'));
          else resolve(user);
        });
      }
    }
  ));

exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
