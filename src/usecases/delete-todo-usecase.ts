import { TodoRepositoryInterface } from "../domaine/todo-repository.interface";
import { UseCase } from "./usecase.abstract";

export class DeleteTodoUseCase extends UseCase {
  // constructor(
  //   private repository: TodoRepositoryInterface
  // ){}

  async execute(id: string): Promise<void> {
    const todo = await this.repository.findById(id)
    if(!todo) {
      throw new Error("Todo not found")
    }
    if(!todo.finished) {
      throw new Error("Todo is not finished")
    }
    await this.repository.delete(todo!)
  }
}