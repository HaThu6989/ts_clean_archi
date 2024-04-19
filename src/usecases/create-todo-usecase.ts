import { Todo } from "../domaine/todo-entity";
import { TodoRepositoryInterface } from "../domaine/todo-repository.interface";
import {v4} from "uuid";
import { UseCase } from "./usecase.abstract";

export class CreateTodoUseCase extends UseCase {
  // constructor(private repository: InMemoryTodoRepository){}
  // vì InMemoryTodoRepository là hérité của TodoRepositoryInterface
  // constructor(
  //   private repository: TodoRepositoryInterface
  // ){}
  // có extends UseCase => ko cần constructor
  // phải tạo UseCase vì interface ko có constructor
  
  async execute(title: string) : Promise<Todo> {
    const newTodo = new Todo(v4(), title)
    await this.repository.create(newTodo)
    return newTodo
  }
} 