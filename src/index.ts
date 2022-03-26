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
app.use(cors())

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
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