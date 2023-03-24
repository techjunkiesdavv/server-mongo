import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit: '30mb',extended:true}));

app.use(bodyParser.urlencoded({limit: '30mb',extended:true}));
app.use(cors());

app.use('/user',userRoutes);
// .env setup
// PORT=5000
// CONNECTION_URL=mongodb+srv://sih2022:sih2022@societymanagment.teylon6.mongodb.net/?retryWrites=true&w=majority

const PORT =process.env.PORT||5000;
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT,()=>console.log(`server running on port ${PORT}`))).catch((error)=>console.log(`${error} did not connected`));
