import { Todo } from "../domaine/todo-entity";
import { TodoRepositoryInterface } from "../domaine/todo-repository.interface";

export abstract class UseCase {
  constructor(protected readonly repository : TodoRepositoryInterface) {}
  abstract execute(...args: string[]) : Promise<Todo|void>
}