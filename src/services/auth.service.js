const { User } = require('../models');
const JWTUtils = require('../utils/jwt');

class AuthService {
  static async register(userData) {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [User.sequelize.Sequelize.Op.or]: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error('Email is already registered');
      }
      if (existingUser.username === username) {
        throw new Error('Username is already taken');
      }
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password_hash: password // Will be hashed by the model hook
    });

    // Generate tokens
    const payload = { userId: user.uuid, email: user.email };
    const accessToken = JWTUtils.generateToken(payload);
    const refreshToken = JWTUtils.generateRefreshToken(payload);

    // Return user data without password
    const userResponse = {
      id: user.uuid,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return {
      user: userResponse,
      accessToken,
      refreshToken
    };
  }

  static async login(loginData) {
    const { email, password } = loginData;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid Email or password');
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      throw new Error('Invalid email or Password');
    }

    // Generate tokens
    const payload = { userId: user.uuid, email: user.email };
    const accessToken = JWTUtils.generateToken(payload);
    const refreshToken = JWTUtils.generateRefreshToken(payload);

    // Return user data without password
    const userResponse = {
      id: user.uuid,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return {
      user: userResponse,
      accessToken,
      refreshToken
    };
  }

  static async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = JWTUtils.verifyToken(refreshToken);
      
      // Find user
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Generate new access token
      const payload = { userId: user.uuid, email: user.email };
      const newAccessToken = JWTUtils.generateToken(payload);

      return {
        accessToken: newAccessToken
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  static async getUserById(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.uuid,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }

  static async updateProfile(userId, updateData) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { username, email } = updateData;

    // Check for conflicts if updating username or email
    if (username || email) {
      const whereClause = {
        uuid: { [User.sequelize.Sequelize.Op.ne]: userId }
      };

      if (username) whereClause.username = username;
      if (email) whereClause.email = email;

      const existingUser = await User.findOne({ where: whereClause });

      if (existingUser) {
        if (existingUser.username === username) {
          throw new Error('Username is already taken');
        }
        if (existingUser.email === email) {
          throw new Error('Email is already registered');
        }
      }
    }

    // Update user
    await user.update(updateData);

    // Return updated user data
    return {
      id: user.uuid,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }
}

module.exports = AuthService;
