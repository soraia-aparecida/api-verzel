import { AddressInfo } from "net"
import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { UserController } from "./controller/UserController"
import { ModuleController } from "./controller/ModuleController"
import { ClasseController } from "./controller/ClasseController"

dotenv.config()

const app: Express = express();
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "*")
    app.use(cors());
    next();
});

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})

const userController = new UserController()
const moduleController = new ModuleController()
const classeController = new ClasseController()

app.post('/user/login', userController.loginController )
app.post('/user/signup', userController.signupController )

app.get('/module', moduleController.getAllModuleController)
app.post('/module/add', moduleController.createModuleController)
app.put('/module/edit/:id', moduleController.editModuleController)
app.delete('/module/delete', moduleController.deleteModuleController)

app.get('/classe/:id', classeController.getAllClasseController)
app.post('/classe/add', classeController.createClasseController)
app.put('/classe/edit/:id', classeController.editClasseController)
app.delete('/classe/delete', classeController.deleteClasseController)

export default app
