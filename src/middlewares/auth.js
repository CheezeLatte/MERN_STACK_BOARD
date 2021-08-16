const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const { verifyAccessToken } = require('../utils/jwt');
const { User } = require('../models');

const requireLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    req.user = await verifyAccessToken(token);
    return next();
  }
  throw createError(401, 'token required');
});

exports.requireLoggedIn = requireLoggedIn;

exports.isAdmin = [
  requireLoggedIn,
  (req, res, next) => req.user.role === 'admin' ? next() : next(createError(403, 'forbidden'))
];
