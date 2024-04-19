import { NextFunction, Request, Response } from "express";
import { InMemoryTodoRepository } from "../../../repositories/in-memory-todo-repository";
import { CreateTodoUseCase } from "../../../usecases/create-todo-usecase";
import { CreateTodoInputs, UpdateTodoInputs } from "../dto/todo.dto";
import { ToggleDoneUseCase } from "../../../usecases/toogle-done-usecase";
import { DeleteTodoUseCase } from "../../../usecases/delete-todo-usecase";
import { UpdateTodoUseCase } from "../../../usecases/update-todo-usecase";

const repository = new InMemoryTodoRepository()

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await repository.findAll()

    res.status(201).json(todos)
  } catch (error) {
    next(error)
  }
}


export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = <CreateTodoInputs>req.body
    const createTodoUseCase = new CreateTodoUseCase(repository)
    const createdTodo = await createTodoUseCase.execute(body.title)
    
    res.status(201).json(createdTodo)
  } catch (error) {
    next(error)
  }
}


export const toogleTodo  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const toogleDoneUseCase = new ToggleDoneUseCase(repository)
    const todo = await toogleDoneUseCase.execute(id)
    res.status(201).json(todo)
  } catch (error) {
    next(error)
  }
}

export const deleteTodo  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const deleteTodoUseCase = new DeleteTodoUseCase(repository)
   await deleteTodoUseCase.execute(id)
    res.status(201).json(`Todo with id ${id} deleted`)
  } catch (error) {
    next(error)
  }
}

export const updateTodo  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    //một cách ép kiểu (type assertion) để nói cho TypeScript biết rằng bạn chắc chắn req.body sẽ có cấu trúc giống như UpdateTodoInputs.
    const body = <UpdateTodoInputs>req.body
    const updateTodoUseCase = new UpdateTodoUseCase(repository)
    const todoUpdated = await updateTodoUseCase.execute(id, body.title)
    res.status(201).json(todoUpdated)
  } catch (error) {
    next(error)
  }
}