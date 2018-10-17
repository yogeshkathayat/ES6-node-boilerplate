const path = require('path');

// import .env variables
require('dotenv-safe').load({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  postgre: {
    uri: process.env.NODE_ENV === 'test' ?
      process.env.PGSQL_URI_TESTS : process.env.PGSQL_URI,
    db: process.env.PGSQL_DB,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    username: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASS,
    enabled: process.env.PGSQL_ENABLED,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  appVersion: process.env.APP_VERSION,
  EncryptionKey32B: process.env.ENCRYPTION_KEY_32BIT,
  
};
