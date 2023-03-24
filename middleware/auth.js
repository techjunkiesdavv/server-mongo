import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
const secret='test';


const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
    
// console.log(token.length);
    let decodedData;

    if (token ) { 
             
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } 
        next();
    } catch (error) {
        console.log(error);
        
    }
}

export default auth;