import { ClasseDatabase } from "../data/ClasseDatebse"
import { ModuleDatabase } from "../data/ModuleDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { CustomError } from "../error/CustomError"
import { Classe, classeInputDTO, classeOutputDTO, editClasseInputDTO } from "../model/classe"
import { Authetication } from "../services/Authentication"
import { CorrectDate } from "../services/CorretDate"
import { IdGenerator } from "../services/IdGenerator"

const classeDatabase = new ClasseDatabase()
const idGenerator = new IdGenerator()
const authentication = new Authetication()
const userDatabase = new UserDatabase()
const moduleDatabase = new ModuleDatabase()
const corretDate = new CorrectDate()

export class ClasseBusiness {

    public createClasseBusiness = async (token: string, classe: classeInputDTO): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!classe.name || !classe.moduleId || !classe.classDate) {
            throw new CustomError(422, "Para realizar o cadastro de uma nova aula é necessário informar o seguinte campos: name, classDate, moduleId.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userRole: string = user.getRole()

        if (userRole !== "ADMIN") {
            throw new CustomError(401, "Somente usuários 'ADMIN' podem cadastrar uma nova aula.")
        }

        const checkExistenceModuleOfId = await moduleDatabase.getModuleById(classe.moduleId)

        if (!checkExistenceModuleOfId) {
            throw new CustomError(404, "Módulo não cadastrado no nosso banco de dados.")
        }

        const checkExistenceClasseOfName = await classeDatabase.getClasseByName(classe.name)

        if (checkExistenceClasseOfName) {
            throw new CustomError(409, "Aula já cadastrado no nosso banco de dados.")
        }

        const id = idGenerator.generateId()

        const dateFormatted = corretDate.sendDateToDB(classe.classDate)

        const newClasse = new Classe(id, classe.name, dateFormatted, classe.moduleId)

        await classeDatabase.insertClasse(newClasse)
    }

    public editClasseBusiness = async (token: string, input: editClasseInputDTO): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if(!input.name || !input.classDate){
            throw new CustomError(422, "Para editar uma aula é necessário informar o seguinte campos: name e classDate.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userRole: string = user.getRole()

        if (userRole !== "ADMIN") {
            throw new CustomError(401, "Somente usuários 'ADMIN' podem editar uma aula.")
        }

        const checkExistenceOfId = await classeDatabase.getClasseById(input.id)

        if (!checkExistenceOfId) {
            throw new CustomError(404, "Aula não cadastrada no nosso banco de dados.")
        }

        const dateFormatted = corretDate.sendDateToDB(input.classDate)
        await classeDatabase.editClasse(input.id, input.name, dateFormatted)
    }

    public getAllClasseBusiness = async (id: string): Promise<classeOutputDTO[]> => {

        const checkExistenceModuleOfId = await moduleDatabase.getModuleById(id)

        if (!checkExistenceModuleOfId) {
            throw new CustomError(404, "Módulo não cadastrado no nosso banco de dados.")
        }

        const classes = await classeDatabase.getAllClasse(id)
        const result: any = classes.map((item: classeOutputDTO) => {
            return ({
                id: item.id,
                name: item.name,
                classDate: corretDate.currentDateFormatted(item.class_date),
                muduleId: item.module_id
            })
        })

        return result
    }

    public deleteClasseById = async (token: string, id: string): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id) {
            throw new CustomError(422, "Para excluir uma aula é necessário informar um id.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userRole: string = user.getRole()

        if (userRole !== "ADMIN") {
            throw new CustomError(401, "Somente usuários 'ADMIN' podem excluir um módulo.")
        }

        const checkExistenceOfId = await classeDatabase.getClasseById(id)

        if (!checkExistenceOfId) {
            throw new CustomError(404, "Aula não cadastrado no nosso banco de dados.")
        }

        await classeDatabase.deleteClasse(id)
    }
}