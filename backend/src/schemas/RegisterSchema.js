const Joi = require('joi');

// Register schema
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Username must be a string',
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must not exceed 50 characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().max(100).required().messages({
    'string.email': 'Invalid email format',
    'string.max': 'Email must not exceed 100 characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(4).max(128).required().messages({
    'string.min': 'Password must be at least 4 characters',
    'string.max': 'Password must not exceed 128 characters',
    'any.required': 'Password is required',
  }),
  role: Joi.string().valid('member', 'admin').default('member').messages({
    'any.only': 'Role must be either "member" or "admin"',
  }),
});

// Login schema
const loginSchema = Joi.object({
  email: Joi.string().email().max(100).required().messages({
    'string.email': 'Invalid email format',
    'string.max': 'Email must not exceed 100 characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(4).max(128).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password must not exceed 128 characters',
    'any.required': 'Password is required',
  }),
});


module.exports = {registerSchema,loginSchema}