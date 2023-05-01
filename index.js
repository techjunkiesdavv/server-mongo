import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fetchData } from "./api/fetch.js";
import userRoutes from "./routes/users.js";
import user from "./models/user.js";
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connected`));

setInterval(() => {
  let obj = [];
  fetchData("user").then((data) => {
    obj = data;
    for (let x of obj) {
      if (x.allowed === true) {
        const insertUser = async () => {
          const check = await user.findOne({ email: x.email });
          if (!check) {
            const res = await user.create({
              email: x.email,
              password: x.password,
              name: `${x.firstName} ${x.lastName}`,
            });
          }
        };
        insertUser();
      } else {
        const deleteUser = async () => {
          const res = await user.deleteMany({ email: x.email });
        };
        deleteUser();
      }
    }
  });
}, 10000);
