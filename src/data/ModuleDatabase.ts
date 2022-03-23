import { Module } from "../model/module"
import { BaseDatabase } from "./BaseDatabase"

export class ModuleDatabase extends BaseDatabase {
    protected TABLE_MODULE = 'Verzel_Module'
    protected TABLE_CLASSE = 'Verzel_Classe'

    public insertModule = async (module: Module): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_MODULE)
            .insert(module)
    }

    public getModuleById = async (id: string): Promise<Module> => {
        try {
            const [module] = await BaseDatabase.connection(this.TABLE_MODULE)
                .select()
                .where({ id })

            const newModule = module && Module.toModuleModel(module)
            return newModule

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getModuleByName = async (name: string): Promise<Module> => {
        try {
            const [module] = await BaseDatabase.connection(this.TABLE_MODULE)
                .select()
                .where({ name })

            const newModule = module && Module.toModuleModel(module)
            return newModule

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getAllModule = async (): Promise<Module[]> => {
        const module: Module[] = await BaseDatabase.connection(this.TABLE_MODULE)
            .select()
            .orderBy('name')

        return module
    }

    public editModule = async (id: string, name: string): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_MODULE)
                .where({ id })
                .update({
                    name: name
                })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public deleteModule = async (id: string): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_CLASSE)
                .where({ module_id: id })
                .delete()

            await BaseDatabase.connection(this.TABLE_MODULE)
                .where({ id })
                .delete()

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


}