import express from "express"
import { ModuleController } from "../controller/ModuleController"

export const moduleRouter = express.Router()

const moduleController = new ModuleController()

moduleRouter.get('/', moduleController.getAllModuleController)
moduleRouter.post('/add', moduleController.createModuleController)
moduleRouter.put('/edit/:id', moduleController.editModuleController)
moduleRouter.delete('/delete', moduleController.deleteModuleController)