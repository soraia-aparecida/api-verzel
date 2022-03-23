import { userRouter } from "./router/userRouter"
import { moduleRouter } from "./router/moduleRouter"
import { classeRouter } from "./router/classeRouter"
import { app } from "./app"

app.use('/user', userRouter)
app.use('/module', moduleRouter)
app.use('/classe', classeRouter)

