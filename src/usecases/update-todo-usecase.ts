import { Todo } from "../domaine/todo-entity";
import { UseCase } from "./usecase.abstract";

export class UpdateTodoUseCase extends UseCase {
  async execute(id: string, title: string): Promise<void | Todo> {
    const todo = await this.repository.findById(id)
    if(!todo) {
      throw new Error("Todo not found")
    }
    todo.title = title
    await this.repository.update(todo)
    return todo
  }
}