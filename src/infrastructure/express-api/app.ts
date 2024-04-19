import express from "express"
import { todoRoutes } from "./routes/todo.routes"
import { errorHandlingMiddleware } from "./middleware/error-handler"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(todoRoutes)
app.use(errorHandlingMiddleware)

app.listen(3000, () => {
  console.log("Server connected on http://localhost:3000")
}) 