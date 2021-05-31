import User from '../models/User';
import { validationResult } from 'express-validator';
import bcyrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    const salt = await bcyrpt.genSalt(10);
    user.password = await bcyrpt.hash(password, salt);
    await user.save();

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
        res.json({ token, name, email });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
};
