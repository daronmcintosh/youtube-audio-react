require('dotenv').config();
const log = require('loglevel');

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  log.setDefaultLevel('TRACE');
} else {
  log.setDefaultLevel('INFO');
}

module.exports = {
  apiKey: process.env.API_KEY,
  isProduction,
};
