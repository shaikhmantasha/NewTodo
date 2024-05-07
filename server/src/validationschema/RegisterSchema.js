import { check } from "express-validator";

export const RegisterSchema = [
    check('name').trim().isAlpha().withMessage("Name Should be alphabets only"),

    check('username', 'username is requires').exists()
    .trim().isLength({min:6 , max:32})
    .isAlphanumeric().withMessage("Username Should be alphanumeric"),

    check('password' , 'Password is required' ).exists().isAlphanumeric().isLength({min:6 , max:100}).trim(),

    check('email' , 'email is requires').exists().isEmail()
    
]