import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// export const RemoveTodo = async (req , res) => {
//     // const error = validationResult(req);

//     // if(!error.isEmpty()){
//     //     return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY , "Todo Id is required" , error.mapped()));
//     // }

//     try {
//             console.log("call from removeTodo controller")
//             // console.log(req.body)
//             // const object_id = mongoose.Types.ObjectId(req.body.todo_id)
//             const object_id = req.body.todo_id

//             const result = await Todo.findOneAndUpdate({"_id" : object_id} ,{"$set" : {isDeleted: true}}  , {new  : true})

//             return result

//     }
        
//     catch (error) {

//         return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY , "Todo could not be deleted" , null))
        
//     }
// }

export const RemoveTodo = async (req, res) => {
    try {
        console.log("Call from removeTodo controller");

        // Extract todo_id from the request body and validate it
        const { todo_id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(todo_id)) {
            // If the todo_id is not a valid ObjectId, return an error response
            return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Todo ID", null));
        }

        // Explicitly convert the string to an ObjectId
        const objectId = new mongoose.Types.ObjectId(todo_id);

        // Proceed with finding and updating the Todo item using the ObjectId
        const result = await Todo.findOneAndUpdate(
            { "_id": objectId },
            { "$set": { isDeleted: true } },
            { new: true }
        );

        // Check if the result is null, which indicates no document was found with that ID
        if (!result) {
            return res.status(StatusCode.NOT_FOUND).json(jsonGenerate(StatusCode.NOT_FOUND, "Todo not found", null));
        }

        // If the document is found and updated, return the updated document
        return res.json(jsonGenerate(StatusCode.OK, "Todo deleted successfully", result));
    } catch (error) {
        // Log the error and return an error response
        console.error("Error in RemoveTodo:", error);
        return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Todo could not be deleted", null));
    }
}



// import { validationResult } from "express-validator";
// import { jsonGenerate } from "../utils/helpers.js";
// import { StatusCode } from "../utils/constant.js";
// import Todo from "../models/Todo.js";
// import User from "../models/User.js";

// export const RemoveTodo = async (req, res) => {
//     // First, validate the request parameters
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         // Use 422 Unprocessable Entity for validation errors
//         return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(
//             jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Validation errors", errors.mapped())
//         );
//     }

//     try {
//         // Attempt to delete the Todo item
//         const result = await Todo.findOneAndDelete({
//             userId: req.userId,
//             _id: req.body.todo_id,
//         });

//         // Log the result for debugging
//         console.log(result);

//         if (result) {
//             // If Todo was deleted, remove it from the user's list
//             await User.findOneAndUpdate(
//                 { _id: req.userId },
//                 { $pull: { todos: req.body.todo_id } }
//             );

//             // Respond with success message
//             return res.status(StatusCode.SUCCESS).json(
//                 jsonGenerate(StatusCode.SUCCESS, "Todo Deleted", null)
//             );
//         } else {
//             // If no Todo was found to delete
//             return res.status(StatusCode.AUTH_ERROR).json(
//                 jsonGenerate(StatusCode.AUTH_ERROR, "Todo not found", null)
//             );
//         }
//     } catch (error) {
//         // Handle any other errors
//         console.error("Error deleting todo:", error);
//         return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(
//             jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error deleting Todo", null)
//         );
//     }
// };
