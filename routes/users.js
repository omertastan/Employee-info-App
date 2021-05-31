import express from 'express';
import { signup } from '../controllers/users';
import { check } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  signup
);

export default router;
