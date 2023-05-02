import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchData } from './api/fetch.js';
import userRoutes from './routes/users.js';
import User from './models/user.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connected`));

setInterval(() => {
  fetchData('user').then(async (data) => {
    for (let x of data) {
      if (x.allowed === true) {
        const check = await User.findOne({ email: x.email });
        if (!check) {
          const res = await User.create({
            email: x.email,
            password: x.password,
            name: `${x.firstName} ${x.lastName}`,
          });
        }
      } else {
        const res = await User.deleteMany({ email: x.email });
      }
    }
  });
}, 10000);
