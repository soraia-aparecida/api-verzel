import { ModuleDatabase } from "../data/ModuleDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { Module, ModuleInputDTO } from "../model/module";
import { Authetication } from "../services/Authentication";
import { IdGenerator } from "../services/IdGenerator";

const idGenerator = new IdGenerator()
const moduleDatabase = new ModuleDatabase()
const authentication = new Authetication()
const userDatabase = new UserDatabase()

export class ModuleBusiness {

    public createModuleBusiness = async (token: string, module: ModuleInputDTO): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!module.name) {
            throw new CustomError(422, "Para realizar o cadastro de um novo module é necessário informar o seguinte campos: name.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userRole: string = user.getRole()

        if (userRole !== "ADMIN") {
            throw new CustomError(401, "Somente usuários 'ADMIN' podem cadastrar um novo módulo.")
        }

        const checkExistenceOfName = await moduleDatabase.getModuleByName(module.name)

        if (checkExistenceOfName) {
            throw new CustomError(409, "Módulo já cadastrado no nosso banco de dados.")
        }

        const id = idGenerator.generateId()

        const newModule = new Module(id, module.name)

        await moduleDatabase.insertModule(newModule)
    }

    public editModuleBusiness = async (token: string, id: string, name: string): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!name) {
            throw new CustomError(409, "Para editar o módulo é necessário informar o novo nome")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userRole: string = user.getRole()

        if (userRole !== "ADMIN") {
            throw new CustomError(401, "Somente usuários 'ADMIN' podem editar um módulo.")
        }

        const checkExistenceOfId = await moduleDatabase.getModuleById(id)

        if (!checkExistenceOfId) {
            throw new CustomError(404, "Módulo não encontrado, por gentileza informar um id válido.")
        }

        await moduleDatabase.editModule(id, name)
    }

    public getAllModulesBusiness = async (): Promise<Module[]> => {
        const modules = await moduleDatabase.getAllModule()
        return modules
    }

    public deleteModuleById = async (token: string, id: string): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id) {
            throw new CustomError(422, "Para excluir um módulo é necessário informar um id.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userRole: string = user.getRole()

        if (userRole !== "ADMIN") {
            throw new CustomError(401, "Somente usuários 'ADMIN' podem excluir um módulo.")
        }

        const checkExistenceOfId = await moduleDatabase.getModuleById(id)

        if (!checkExistenceOfId) {
            throw new CustomError(404, "Módulo não encontrado, por gentileza informar um id válido.")
        }

        await moduleDatabase.deleteModule(id)
    }
}