import express from 'express';
import { getUser, loginUser } from '../controllers/auth';
import { check } from 'express-validator';
import { isAuthorized } from '../middleware/auth';

const router = express.Router();

router.get('/', isAuthorized, getUser);

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password required').exists(),
  ],
  loginUser
);

export default router;
