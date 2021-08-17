const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const db = require('../../models');
const { User } = db;

// User 관련 Controllers
exports.findUsers = asyncHandler(async (req, res) => {
  const { query: { page, limit } } = req;
  const _page = +(page || 1);
  const _limit = +(limit || 10);
  const skip = (page - 1) * limit;

  const total = await User.countDocuments({ role: 'User' });
  const documents = await User.find({}).skip(skip).limit(_limit);

  res.json({ total, page: _page, limit: _limit, data: documents })
});

exports.findUser = asyncHandler(async (req, res) => {
  const { params: { id } } = req;
  const user = await User.findById(id).select('-hashedPassword');
  if (!user) throw createError(404, 'User Not Found');
  res.json({ success: true, status: 200, message: `User ${id} Data`, data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { body: $set, params: { id } } = req;

  delete $set.role;

  const user = await User.findById(id);
  if (!user) throw createError(404, 'User Not Found');
  await user.updateOne({ $set });
  res.json({ success: true, status: 200, message: 'User Info Updated' });
});
