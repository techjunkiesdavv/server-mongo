import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { fetchData } from "./api/fetch.js";
import userRoutes from './routes/users.js';

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
  
    console.log('Connected successfully with the database');
  })
  .catch((error) => console.log(`${error} did not connect`));


setInterval(() => {
  let obj = [];
  fetchData("user").then((data) => {
    obj = data;

    for (let x of obj) {
      // console.log(x);
      if (x.allowed === true) {
        const insertUser = async () => {
          const check = await user.findOne({ email: x.email });
          if (!check) {
            const res = await user.create({
              email: x.email,
              password: x.password,
              name: `${x.firstName} ${x.lastName}`,
            });
            // console.log(res);
          }
        };
        insertUser();
      } else {
        const deleteUser = async () => {
          const res = await user.deleteMany({ email: x.email });
          // console.log(res);
        };
        deleteUser();
      }
    }
  });
}, 10000);



app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

export default app;