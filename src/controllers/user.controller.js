const AuthService = require('../services/auth.service');

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await AuthService.getUserById(req.userId);
      
      res.json({
        success: true,
        data: user,
        message: 'Profile retrieved successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: error.message || 'Profile not found'
        }
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const updatedUser = await AuthService.updateProfile(req.userId, req.body);
      
      res.json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'PROFILE_UPDATE_ERROR',
          message: error.message || 'Profile update failed'
        }
      });
    }
  }
}

module.exports = UserController;
