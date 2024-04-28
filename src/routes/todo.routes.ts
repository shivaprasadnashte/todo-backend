import express,{ Express } from "express";
import { addTodo, getTodos } from "../controllers/todo.controller";
const todoRoutes = express.Router();

todoRoutes.get("/gettodos", getTodos);
todoRoutes.post("/addtodo", addTodo);
export default todoRoutes;