const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');

mongoose.connect(MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
})
  .then(() => console.log('connected mongodb'))
  .catch(err => console.error(err));

module.exports = {
  ...require('./refresh-token.schema'),
  ...require('./user'),
};
