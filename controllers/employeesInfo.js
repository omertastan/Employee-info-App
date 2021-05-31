import { validationResult } from 'express-validator/';
import EmployeesInfo from '../models/EmployeesInfo';

export const getEmployeesInfo = async (req, res) => {
  try {
    const employeesInfo = await EmployeesInfo.find({ user: req.user.id }).sort({
      date: -1,
    });
    if (!employeesInfo) {
      return res.json({ msg: 'You dont have any employeesInfo' });
    }
    res.json({ employeesInfo });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

export const addEmployeesInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, species } = req.body;
  const newPhone = phone ? phone : 'Is Not Provided';
  try {
    const employeesInfo = new EmployeesInfo({
      name,
      email,
      phone: newPhone,
      species,
      user: req.user.id,
    });
    await employeesInfo.save();
    res.json({ employeesInfo });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
};

export const updateEmployeesInfo = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, species } = req.body;
  try {
    const employeesInfo = await EmployeesInfo.findById(id);
    if (!employeesInfo) {
      return res.status(400).json({ msg: 'There is no such employeesInfo' });
    }
    if (employeesInfo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized to do this' });
    }
    employeesInfo.name = name ? name : employeesInfo.name;
    employeesInfo.email = email ? email : employeesInfo.email;
    employeesInfo.phone = phone ? phone : employeesInfo.phone;
    employeesInfo.species = species ? species : employeesInfo.species;

    await employeesInfo.save();
    res.json({ employeesInfo });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
};
export const deleteEmployeesInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const employeesInfo = await EmployeesInfo.findById(id);
    if (!employeesInfo) {
      return res.status(400).json({ msg: 'There is no such employeesInfo' });
    }
    if (employeesInfo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You are not authorized to do this' });
    }
    await EmployeesInfo.findByIdAndRemove(id);
    res.json({ msg: 'EmployeesInfo Removed' });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
};
