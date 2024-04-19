import { Todo } from "../domaine/todo-entity";
import { TodoRepositoryInterface } from "../domaine/todo-repository.interface";
import { UseCase } from "./usecase.abstract";

/**
 * ToggleDoneUseCase, class này cần một đối tượng repository để thực hiện thao tác cập nhật dữ liệu, vì vậy nó chấp nhận đối tượng repository thông qua constructor để phụ thuộc vào nó.
 */
export class ToggleDoneUseCase extends UseCase {
  // constructor(
  //   private repository: TodoRepositoryInterface
  // ){}

  async execute(id: string): Promise<Todo> {
    const todo = await this.repository.findById(id)
    if(!todo) {
      throw new Error("Todo not found")
    }
    // todo!.finished = !todo!.finished 
    // => vì có đk phía trên nên ko cần todo!
    todo.finished = !todo!.finished
    await this.repository.update(todo) // ! peut etre null
    return todo
  }
}

/**
 * Trong class ToggleDoneUseCase, đối tượng repository được truyền vào thông qua constructor. Điều này cho phép bạn chọn và chuyển đối tượng repository (có thể là InMemoryTodoRepository hoặc một loại repository khác) mà bạn muốn sử dụng.
 * Constructor được sử dụng để chú thích rằng class này phụ thuộc vào một đối tượng repository để thực hiện công việc của nó. Bằng cách này, nó tách biệt các trách nhiệm và tạo điều kiện cho tính linh hoạt và kiểm thử tốt hơn.
 */