import Todo from "../models/Todo.js";
import User from "../models/User.js"
import { StatusCode } from "../utils/constant.js";
import { jsonGenerate } from "../utils/helpers.js";

export const GetTodos = async (req , res) => {
    try {
        const list = await Todo.find({userId : req.userId , isDeleted : false})
        console.log(list)

        return res.json(jsonGenerate(StatusCode.SUCCESS , "All ToDo List" , list))
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY ,"error" , error))
        
    }
}