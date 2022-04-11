import { Request, Response } from "express"
import { ModuleBusiness } from "../business/ModuleBusiness"
import { ModuleInputDTO } from "../model/module"

const moduleBusiness = new ModuleBusiness()

export class ModuleController {

    public createModuleController = async (req: Request, res: Response): Promise<void> => {

        try {
            const inputModule: ModuleInputDTO = {
                name: req.body.name
            }
            const token = req.headers.authorization as string

            await moduleBusiness.createModuleBusiness(token, inputModule)

            res.status(201).send({ message: "Módulo criado com sucesso!" })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public editModuleController = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string
            const id = req.params.id
            const name: string = req.body.name

            await moduleBusiness.editModuleBusiness(token, id, name)

            res.status(200).send({ message: "Módulo editado com sucesso!" })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public getAllModuleController = async (req: Request, res: Response): Promise<void> => {

        try {
            const modules = await moduleBusiness.getAllModulesBusiness()
            res.status(200).send({ modules })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public deleteModuleController = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string
            const id = req.body.id

            await moduleBusiness.deleteModuleById(token, id)

            res.status(200).send({ message: "Módulo deletado com sucesso!" })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public getModuleByIdController = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = req.params.id
            const module = await moduleBusiness.getModuleById(id)

            res.status(200).send({ module })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}

