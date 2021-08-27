const mongoose = require('mongoose');
const { Schema } = mongoose;

const postModel = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title:String,
  article:String,
  writer:String,
}, {timestamps: true});

exports.Post = mongoose.model('post', postModel);
