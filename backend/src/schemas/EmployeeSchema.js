const Joi = require("joi");

const EmployeeSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
      "string.max": "First name must not exceed 50 characters",
    }),
    
  lastName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters",
      "string.max": "Last name must not exceed 50 characters",
    }),

  nationalId: Joi.string()
    .length(16)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "National identity is required",
      "string.length": "National identity must be 16 digits",
      "string.pattern.base": "National identity must contain only digits",
    }),

  phone: Joi.string()
    .pattern(/^07[2,3,8,9][0-9]{7}$/)
    .required()
    .messages({
      "string.empty": "Telephone number is required",
      "string.pattern.base": "Telephone number must be a valid Rwandan number (e.g., 0788888888)",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),

  department: Joi.string()
    .valid("Human Resource", "Finance", "IT", "Marketing", "Operations")
    .required()
    .messages({
      "any.only": "Department must be one of Human Resource, Finance, IT, Marketing, Operations",
      "string.empty": "Department is required",
    }),

  position: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.empty": "Position is required",
      "string.min": "Position must be at least 2 characters",
      "string.max": "Position must not exceed 50 characters",
    }),

  laptopManufacturer: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.empty": "Laptop manufacturer is required",
      "string.min": "Laptop manufacturer must be at least 2 characters",
      "string.max": "Laptop manufacturer must not exceed 50 characters",
    }),

  model: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.empty": "Model is required",
      "string.min": "Model must be at least 2 characters",
      "string.max": "Model must not exceed 50 characters",
    }),

  serialNumber: Joi.string()
    .min(5)
    .max(20)
    .trim()
    .required()
    .messages({
      "string.empty": "Serial number is required",
      "string.min": "Serial number must be at least 5 characters",
      "string.max": "Serial number must not exceed 20 characters",
    }),
});

module.exports = EmployeeSchema ;
