import { body } from 'express-validator'

const validateRegister = [
  body('firstname').trim().notEmpty().isLength({ min: 1, max: 50 }).withMessage('firstname is required'),
  body('lastname').trim().notEmpty().isLength({ min: 1, max: 50 }).withMessage('lastname is required'),
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password').trim().notEmpty().isLength({ min: 6 }).withMessage('minimum 6 characters'),
]

const validateLogin = [
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password is required'),
]

const validatePost = [
  body('title').trim().notEmpty().isLength({ min: 1, max: 255 }).withMessage('title is required'),
  body('message').trim().notEmpty().withMessage('message is required'),
]

const validateComment = [
  body('content').trim().notEmpty().withMessage('content is required'),
]

export { validateRegister, validateLogin, validatePost, validateComment }