// import { sign, verify } from 'jsonwebtoken';
const { sign, verify } = require('jsonwebtoken');
const SECRET_KEY = 'development';

function generateToken(payload) {
  console.log("token");
  return sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  return verify(token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };