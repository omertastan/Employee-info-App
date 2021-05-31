import express from 'express';
import {
  getEmployeesInfo,
  addEmployeesInfo,
  updateEmployeesInfo,
  deleteEmployeesInfo,
} from '../controllers/employeesInfo';
import { check } from 'express-validator';

import { isAuthorized } from '../middleware/auth';

const router = express.Router();

router.get('/', isAuthorized, getEmployeesInfo);

router.post('/', isAuthorized, addEmployeesInfo);

router.put(
  '/:id',
  [
    isAuthorized,
    [
      check('name', 'Please add name').not().isEmpty(),
      check('email', 'Please enter a valid email').isEmail(),
    ],
  ],
  updateEmployeesInfo
);

router.delete('/:id', isAuthorized, deleteEmployeesInfo);

export default router;
