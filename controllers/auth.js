import { validationResult } from 'express-validator/';
import bcyrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Wrong email-password pair' });
    }

    const doMatch = await bcyrpt.compare(password, user.password);
    if (!doMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw new err();
        res.json({ token, name: user.name });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};
