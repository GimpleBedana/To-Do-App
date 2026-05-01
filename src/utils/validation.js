const Joi = require('joi');

const userSchemas = {
  register: Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 50 characters',
      'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).max(100).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 100 characters',
      'any.required': 'Password is required'
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required'
    })
  }),

  updateProfile: Joi.object({
    username: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional()
  }).min(1)
};


const categorySchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(100).required().messages({
      'string.min': 'Category name cannot be empty',
      'string.max': 'Category name cannot exceed 100 characters',
      'any.required': 'Category name is required'
    }),
    color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).default('#007bff').messages({
      'string.pattern.base': 'Color must be a valid hex color code (e.g., #FF5733)'
    })
  }),

  params: Joi.object({
    id: Joi.string().uuid().required().messages({
      'string.guid': 'Invalid category ID format',
      'any.required': 'Category ID is required'
    })
  }),

  update: Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).optional()
  }).min(1)
};

const todoSchemas = {
  create: Joi.object({
    title: Joi.string().min(1).max(255).required().messages({
      'string.min': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 255 characters',
      'any.required': 'Title is required'
    }),
    description: Joi.string().max(1000).optional().allow(''),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    due_date: Joi.date().iso().optional(),
    category_id: Joi.string().uuid().optional()
  }),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    category_id: Joi.string().uuid().optional(),
    search: Joi.string().max(100).optional()
  }),

  params: Joi.object({
    id: Joi.string().uuid().required().messages({
      'string.guid': 'Invalid todo ID format',
      'any.required': 'Todo ID is required'
    })
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(255).optional(),
    description: Joi.string().max(1000).optional().allow(''),
    status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    due_date: Joi.date().iso().optional().allow(null),
    category_id: Joi.string().uuid().optional().allow(null)
  }).min(1),

  updateStatus: Joi.object({
    status: Joi.string().valid('pending', 'in_progress', 'completed').required().messages({
      'any.required': 'Status is required',
      'any.only': 'Status must be one of: pending, in_progress, completed'
    })
  })
};

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = req[source];
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details
        }
      });
    }

    req[source] = value;
    next();
  };
};

const validateRequest = (schema, source = 'body') => validate(schema, source);

module.exports = {
  userSchemas,
  todoSchemas,
  categorySchemas,
  validate,
  validateRequest
};
