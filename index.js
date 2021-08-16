const app = require('./src/app');
const http = require('http');
const { User } = require('./src/models');

require('dotenv').config();

const PORT = +(process.env.PORT || 8080);
const server = http.createServer(app);

const docType = ['PolicyBrief','PolicyQnA','ComplaintsQnA','ComplaintsQnA2'];

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
init();

async function init() {
  const {
    ADMIN_EMAIL: email,
    ADMIN_PASSWORD: password,
    ADMIN_NAME: name = '관리자'
  } = process.env;

  const exAdmin = await User.findOne({ email });
  if (!exAdmin) await User.create({ email, password, name, role: 'admin' });
}
