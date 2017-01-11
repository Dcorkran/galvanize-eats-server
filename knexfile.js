require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize-eats'
  },
  production:{
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
