export class Todo {
  constructor(
    public readonly id: string, // interdire de changer id plus tard
    public title: string,
    public finished: boolean = false
  ){}
}