import  express  from "express";
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validationschema/RegisterSchema.js";
import { LoginSchema } from "../validationschema/LoginSchema.js";
import Login from "../controllers/Login.controller.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();


apiRoute.post('/register' , RegisterSchema,Register);
apiRoute.post('/login' , LoginSchema,Login);
// api protected
apiProtected.post("/createTodo", [check("desc" , "Todo desc is required").exists()] , createTodo);

apiProtected.get("/todolist",GetTodos);

apiProtected.post("/marktodo", [check("todo_id" , "Todo Id is required").exists()] , MarkTodo);

apiProtected.post("/deletetodo" , RemoveTodo);






export default apiRoute;
