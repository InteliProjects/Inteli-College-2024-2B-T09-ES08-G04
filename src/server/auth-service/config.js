const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  AUTH0_DOMAIN: process.env.URL,
  ISSUE_BASE_URL: process.env.ISSUE_BASE_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
