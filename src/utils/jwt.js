const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

class JWTUtils {
  static generateToken(payload) {
    return jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpire,
      issuer: 'todo-api',
      audience: 'todo-client'
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, authConfig.jwtSecret, {
        issuer: 'todo-api',
        audience: 'todo-client'
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: '24h',
      issuer: 'todo-api',
      audience: 'todo-client'
    });
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = JWTUtils;
