import { CreateTodoUseCase } from "../src/usecases/create-todo-usecase"
import { DeleteTodoUseCase } from "../src/usecases/delete-todo-usecase";
import { InMemoryTodoRepository } from "../src/repositories/in-memory-todo-repository"
import { ToggleDoneUseCase } from "../src/usecases/toogle-done-usecase"
import { UpdateTodoUseCase } from "../src/usecases/update-todo-usecase";

describe("Todolist", () => {
  let repository: InMemoryTodoRepository;
  let createTodoUseCase: CreateTodoUseCase;
  let toogleDoneUseCase: ToggleDoneUseCase
  let deleteTodoUseCase: DeleteTodoUseCase
  let updateTodoUseCase: UpdateTodoUseCase


  // avant chaque test
  beforeEach(()=> {
    repository = new InMemoryTodoRepository()
    createTodoUseCase = new CreateTodoUseCase(repository)
    toogleDoneUseCase = new ToggleDoneUseCase(repository)
    deleteTodoUseCase = new DeleteTodoUseCase(repository)
    updateTodoUseCase = new UpdateTodoUseCase(repository)
  }) 

  describe("Scenario: add a new todo", ()=> {
    it("should add a todo", async () => {
    const todo = await createTodoUseCase.execute("A new todo")
    const createdTodo = await repository.findById(todo.id)
     /*Todo {
      id: '6b847166-90a9-41fd-a407-65b10a2a976d',
      title: 'A new todo'
    }*/
    /*repository InMemoryTodoRepository {
      todos: [
        Todo {
          id: 'eb679035-732c-4bc6-bb28-703d1e88dd26',
          title: 'A new todo',
          finished: false
        }
      ]
    }
    Vì : private todos: Todo[] = []
    */
  
    // ! : tôi biết có thể null nhưng cứ chạy code đi vì createdTodo đặt là Todo|null
    expect(createdTodo!.title).toEqual("A new todo")
  })
  })

  describe("Scenario:toogle done a todo", ()=> {
    it("should toogle done a todo", async () => {
        const todo = await createTodoUseCase.execute("A new todo")
        await toogleDoneUseCase.execute(todo.id)

        const updatedTodo = await repository.findById(todo.id)
        /*updatedTodo Todo {
          id: 'a7b05321-e9a0-40bc-9b59-e7e51f6385a9',
          title: 'A new todo',
          finished: true
        }*/
        expect(updatedTodo!.finished).toEqual(true)
      })

      it("should fail if todo not found", async ()=> {
        // ddùng promise nên có rejects => nếu ko thì ko có
        await expect(() => toogleDoneUseCase.execute("not-existing-id")).rejects.toThrow("Todo not found")
      })
    })

  describe("Scenario: Delete a todo when finished", ()=> {
    it("should delete a todo when finished", async () => {
      const todo = await createTodoUseCase.execute("A new todo")
      await toogleDoneUseCase.execute(todo.id)
      await deleteTodoUseCase.execute(todo.id)

      const deletedTodo = await repository.findById(todo.id)
      expect(deletedTodo).toBeNull()
    })
  })

  it("should fail if todo not found", async()=> {
    await expect(() => deleteTodoUseCase.execute("not-existing-id")).rejects.toThrow("Todo not found")
  })

  it("should fail if todo not finished", async()=> {
    const todo = await createTodoUseCase.execute("A new todo")

    await expect(() => deleteTodoUseCase.execute(todo.id)).rejects.toThrow("Todo is not finished")
  })

  describe("Scenario: Delete a todo when finished", ()=> {
    it("should update a todo", async () => {
      const todo = await createTodoUseCase.execute("A new todo")
      await updateTodoUseCase.execute(todo.id, "updated todo")
      const updatedTodo = await repository.findById(todo.id)
      expect(updatedTodo?.title).toEqual("updated todo")
    })
  
    it("should throw error if todo not found", async () => {
      await expect(() => updateTodoUseCase.execute("not-existing-id", "updated title")).rejects.toThrow("Todo not found")
    })
  })

  describe("Scenario: List todos", ()=> {
    it("should list all todos", async () => {
      await createTodoUseCase.execute("A new todo 1")
      await createTodoUseCase.execute("A new todo 2")
      const todos = await repository.findAll()
      expect(todos.length).toEqual(2)
      // expect(updatedTodo?.title).toEqual("updated todo")
    })
  
    // it("should throw error if todo not found", async () => {
    //   await expect(() => updateTodoUseCase.execute("not-existing-id", "updated title")).rejects.toThrow("Todo not found")
    // })
  })
})