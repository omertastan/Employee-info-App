import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const employeesInfochema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  species: {
    type: String,
  },
});

export default mongoose.model('employeesInfo', employeesInfochema);
