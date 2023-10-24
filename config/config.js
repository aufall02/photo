require("dotenv").config()

const config = {
  "development": {
    "username": "aufal",
    "password": "123456",
    "database": "photo_album_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": process.env.DB_DIALECT_TEST
  },
  "production": {
    "username": process.env.DB_USERNAME_PROD,
    "password": process.env.DB_PASSWORD_PROD,
    "database": process.env.DB_NAME_PROD,
    "host": process.env.DB_HOST_PROD,
    "dialect": process.env.DB_DIALECT_PROD,
    "port": process.env.DB_PORT
  }
}

module.exports = config