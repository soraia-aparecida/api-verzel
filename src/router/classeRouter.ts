import express from "express"
import { ClasseController } from "../controller/ClasseController"

export const classeRouter = express.Router()

const classeController = new ClasseController()

classeRouter.get('/:id', classeController.getAllClasseController)
classeRouter.get('/byid/:id', classeController.getClasseByIdController)
classeRouter.post('/add', classeController.createClasseController)
classeRouter.put('/edit/:id', classeController.editClasseController)
classeRouter.delete('/delete', classeController.deleteClasseController)