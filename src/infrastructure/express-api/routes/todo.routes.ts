import express from "express"
import { createTodo, getTodos, toogleTodo, deleteTodo, updateTodo } from "../controllers/todo.controller"

const router = express.Router()

router.get("/", getTodos)
router.post("/create", createTodo)
router.post("/toogle/:id", toogleTodo)
router.delete("/delete/:id", deleteTodo)
router.patch("/update/:id", updateTodo)

export {router as todoRoutes}