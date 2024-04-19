import { Todo } from "../domaine/todo-entity";
import { TodoRepositoryInterface } from "../domaine/todo-repository.interface";

/**
 * InMemoryTodoRepository, class này tự quản lý dữ liệu của nó, nên không cần một đối tượng repository từ bên ngoài.
 */
export class InMemoryTodoRepository implements TodoRepositoryInterface {
  private todos: Todo[] = [] // Biến todos lưu trữ một mảng các đối tượng Todo.

  async findById(id: string): Promise<Todo | null> {
    return this.todos.find((todo: Todo) => todo.id === id) || null
  }

  async create(todo: Todo): Promise<void> {
    this.todos.push(todo)
  }

  async update(todo: Todo): Promise<void> {
    const index = this.todos.findIndex(t => t.id === todo.id)
    this.todos[index] = todo
  }

  async delete(todo: Todo): Promise<void> {
    const index = this.todos.findIndex(t => t.id === todo.id)
    this.todos.splice(index, 1)
  }

  async findAll(): Promise<Todo[]> {
   return this.todos
  }
}
/**
 * Trong class InMemoryTodoRepository, dữ liệu được truy cập và sử dụng trực tiếp thông qua thuộc tính todos. 
 * Điều này có nghĩa là khi bạn tạo một thể hiện của class này (new InMemoryTodoRepository()), 
 * dữ liệu được tạo và quản lý bên trong class đó.
 * Constructor của class này không cần truyền một đối tượng repository vào vì dữ liệu được lưu trữ và quản lý trong class chính nó.
 */