import { Todo } from "./todo-entity";

export interface TodoRepositoryInterface {
  // return 1 promise hoặc là 1 new class Todo hoặc k có gì
  findById(id: string): Promise<Todo|null>;
  // return 1 promise k có gì
  create(todo: Todo): Promise<void>;

  update(todo: Todo): Promise<void>

  delete(todo: Todo): Promise<void>
  
  findAll(): Promise<Todo[]>

}