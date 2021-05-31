import express from 'express';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import employeesInfoRoutes from './routes/employeesInfo';
import connectDb from './config/db';
import { json } from 'body-parser';
import path from 'path';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options('*', cors());

connectDb();
app.use(express.json({ extended: false }));
app.use('/api/users', userRoutes);
app.use('/api/employeesInfo', employeesInfoRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
