import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"
import jwt from 'jsonwebtoken';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const AuthMiddleware = (req , res , next) =>{

    const token = req.headers['auth'];
    console.log(req.headers["auth"])
    console.log(req.headers)
    


    if(req.headers["auth"] === undefined){
         return res.json(jsonGenerate(StatusCode.AUTH_ERROR , "Access Denied"  , req.headers["auth"]))

    }
// 
    
    try {
        const decoded = jwt.verify(token , JWT_TOKEN_SECRET);
        console.log(decoded);

        req.userId = decoded.userId;
        return next();  
        
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY , "Invalid Token"));
    }
}

export default AuthMiddleware;