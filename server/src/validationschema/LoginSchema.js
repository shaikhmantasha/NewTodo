import { check } from "express-validator";

export const LoginSchema = [

    check('username', 'username is required')
    .exists()
    .trim()
    .isLength({min:6 , max:32})
    .isAlphanumeric().withMessage("Username Should be alphanumeric"),

    check('password' , 'Password is required' )
    .exists()
    .isAlphanumeric()
    .isLength({min:6 , max:100})
    .trim(),

    
];