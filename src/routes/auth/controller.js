const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const { User, RefreshToken } = require('../../models');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../utils/jwt');

exports.login = asyncHandler(async (req, res) => {
  const { body: { email, password } } = req;

  const exUser = await User.findOne({ email });
  if (!exUser) throw createError(404, 'User Not Found');
  if (exUser.withdrawn) throw createError(403, 'Forbidden');
  if (!exUser.authenticate(password)) throw createError(400, 'Invalid Password');

  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(exUser.profile), signRefreshToken(exUser._id)
  ]);

  await RefreshToken.updateToken(exUser._id, refreshToken);
  res.json({ success: true, status:200, message: 'LogIn Success', data: {accessToken, refreshToken}});
});

exports.logout = asyncHandler(async (req, res) => {
  const token = req.headers['x-refresh-token'];
  const id = await verifyRefreshToken(token);
  await RefreshToken.removeToken(id, token);
  res.json({ success: true, status: 200, message:'LogOut'});
});

exports.getMe = asyncHandler(async (req, res) => {
  const { user } = req;
  const document = await User.findById(user._id).select('-hashedPassword');
  res.json({ success: true, status: 200, message: `User ${user._id}'s Info`, data: document});
});

exports.updateMe = asyncHandler(async (req, res) => {
  const { body: $set, user } = req;

  delete $set.role;

  const document = await User.findById(user._id);
  await document.updateOne({ $set });
  res.json({ success: true, status: 200, message:'Updated Success' });
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const oldToken = req.headers['x-refresh-token'];
  console.log(oldToken);
  
  if (!oldToken) throw createError(401, 'Token Required');

  const id = await verifyRefreshToken(oldToken);
  const user = await User.findById(id);
  const accessToken = await signAccessToken(user.profile);
  const refreshToken = await signRefreshToken(id);

  await RefreshToken.updateToken(id, refreshToken, oldToken);

  res.json({success: true, status: 200, message: 'Token Refresed', data: {accessToken, refreshToken}});
});

exports.register = asyncHandler(async (req, res) => {
  const { body } = req;
  body.role = 'User';
  const dupleCheck = await User.findOne({email:body.email})
  if(dupleCheck) {
    res.json({ success: true, status: 200, message: `${body.email} Already In Use`})
  } else {
    User.create(body);
    res.json({ success: true, status: 200, message: 'User Registerd' });
  }
});

