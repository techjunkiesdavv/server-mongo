import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email);
    console.log(password);
    const oldUser = await User.findOne({ email });

    if (!oldUser) 
    return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
    console.log("wrong");
    return res.status(400).json({ message: "Invalid credentials" });}

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id },'test', { expiresIn: "1h" });
    

    res.status(200).json({ result:oldUser,  token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};



export const signup = async(req,res)=>{
    const {firstName,lastName,email,password}=obj;
    console.log(email);
    
    try {
        
        const existingUser= await User.findOne({email:email});
        
        // console.log(email); 
        if(existingUser)
        {
            return res.status(400).json({message:"User already exist"});
        }
        if(password!==confirmPassword)
        {
            
            return res.status(400).json({message:"Password Doesn't Match"});
        }
        // console.log(firstName);
        const hashedPassword=await bcrypt.hash(password,10);
            // console.log(hashedPassword);
            const result =await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`,});
            
        // const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"});
        // res.status(200).json({result,token});

        const token = jwt.sign( { email: result.email, id: result._id },'test', { expiresIn: "1h" } );
        
        res.status(201).json({ result,token });
    } catch (error) {
        
        res.status(500).json({message:"something went wrong"});
    }

}