const isProduction = process.env.NODE_ENV === 'production';

// GET environment variables from .env file if we are not in production
if (!isProduction) {
  require('dotenv').config();
}

module.exports = {
  'apiKey': process.env.API_KEY,
};
