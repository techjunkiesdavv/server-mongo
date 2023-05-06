import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

import { fetchData } from "../api/fetch.js";


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
      let obj = [];
      fetchData("user").then((data) => {
        obj = data;
        for (let x of obj) {
          
          if (x.allowed === true) {
            const insertUser = async () => {
              const check = await User.findOne({ email: x.email });
              if (!check) {
                const res = await user.create({
                  email: x.email,
                  password: x.password,
                  name: `${x.firstName} ${x.lastName}`,
                });
                
              }
            };
            insertUser();
          }
           else {
            const deleteUser = async () => {
              const res = await User.deleteMany({ email: x.email });
             
            };
            deleteUser();
           }
        }
      });
   
    const oldUser = await User.findOne({email});
   

    if (!oldUser) 
    return res.status(404).json({ message: "User doesn't exist" });

    // const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if ( password!==oldUser.password) {
    console.log("wrong");
    return res.status(400).json({ message: "Invalid credentials" });}

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id },'test', { expiresIn: "1h" });
    

    res.status(200).json({ result:oldUser,  token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const signup = async(req,res)=>{
//     const {firstName,lastName,email,password,confirmPassword}=req.body;
//     console.log(email);
    
//     try {
        
//         const existingUser= await User.findOne({email:email});
        
//         // console.log(email); 
//         if(existingUser)
//         {
//             return res.status(400).json({message:"User already exist"});
//         }
//         if(password!==confirmPassword)
//         {
            
//             return res.status(400).json({message:"Password Doesn't Match"});
//         }
//         // console.log(firstName);
//         const hashedPassword=await bcrypt.hash(password,10);
//             // console.log(hashedPassword);
//             const result =await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`,});
            
//         // const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"});
//         // res.status(200).json({result,token});

//         const token = jwt.sign( { email: result.email, id: result._id },'test', { expiresIn: "1h" } );
        
//         res.status(201).json({ result,token });
//     } catch (error) {
        
//         res.status(500).json({message:"something went wrong"});
//     }

// }
