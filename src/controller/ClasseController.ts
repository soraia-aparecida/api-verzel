import { Request, Response } from "express"
import { ClasseBusiness } from "../business/ClasseBusiness"
import { classeInputDTO, editClasseInputDTO } from "../model/classe"

const classeBusiness = new ClasseBusiness()

export class ClasseController {

    public createClasseController = async (req: Request, res: Response): Promise<void> => {
        try {
            const inputClasse: classeInputDTO = {
                name: req.body.name,
                classDate: req.body.classDate,
                moduleId: req.body.moduleId
            }

            const token = req.headers.authorization as string

            await classeBusiness.createClasseBusiness(token, inputClasse)

            res.status(201).send({ message: "Aula criada com sucesso!" })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public editClasseController = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string

            const input: editClasseInputDTO = {
                id: req.params.id,
                name: req.body.name,
                classDate: req.body.classDate
            }

            await classeBusiness.editClasseBusiness(token, input)

            res.status(200).send({ message: "Aula editada com sucesso!" })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public getAllClasseController = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = req.params.id
            const classes = await classeBusiness.getAllClasseBusiness(id)

            res.status(200).send({ classes })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public deleteClasseController = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string
            const id = req.body.id

            await classeBusiness.deleteClasseById(token, id)

            res.status(200).send({ message: "Aula deletada com sucesso!" })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}