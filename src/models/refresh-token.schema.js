const mongoose = require('mongoose');
const { JWT_REFRESH_TOKEN_EXPIRES_IN } = require('../config');
const { Schema } = mongoose;

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  value: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: JWT_REFRESH_TOKEN_EXPIRES_IN }
  }
}, {
  timestamps: false,
});

schema.index({ user: 1, value: 1 }, { unique: true });

schema.statics.findByUser = function (user, cb) {
  return this.find({ user }, cb);
};

schema.statics.updateToken = async function (user, token, oldToken = null) {
  if (oldToken) {
    await this.deleteOne({ user, value: oldToken });
  }
  await this.create({ user, value: token });
};

schema.statics.removeToken = function (user, token) {
  return this.deleteOne({ user, value: token });
}

exports.RefreshToken = mongoose.model('RefreshToken', schema);
