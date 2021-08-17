const app = require('./src/app');
const http = require('http');
const { User } = require('./src/models');

require('dotenv').config();

const PORT = +(process.env.PORT || 8080);
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
init();

async function init() {
  const {
    ADMIN_ID: id,
    ADMIN_PASSWORD: password,
    ADMIN_NAME: name = '관리자'
  } = process.env;

  const exAdmin = await User.findOne({ id });
  if (!exAdmin) await User.create({ id, password, name, role: 'Admin' });
}
