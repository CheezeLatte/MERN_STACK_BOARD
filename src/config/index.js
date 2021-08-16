const { join } = require('path');
require('dotenv').config();

module.exports = {
    ROOT_DIR: join(__dirname, '../..'),
    ...process.env
};
