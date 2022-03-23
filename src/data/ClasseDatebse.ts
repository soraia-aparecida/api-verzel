import { Classe, classeOutputDTO } from "../model/classe"
import { BaseDatabase } from "./BaseDatabase"

export class ClasseDatabase extends BaseDatabase {
    protected TABLE_CLASSE = 'Verzel_Classe'

    public insertClasse = async (classe: Classe): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_CLASSE)
            .insert(classe)
    }

    public getClasseById = async (id: string): Promise<Classe> => {
        try {
            const [classe] = await BaseDatabase.connection(this.TABLE_CLASSE)
                .select()
                .where({ id })

            const newClasse = classe && Classe.toClasseModel(classe)
            return newClasse

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getClasseByName = async (name: string): Promise<Classe> => {
        try {
            const [classe] = await BaseDatabase.connection(this.TABLE_CLASSE)
                .select()
                .where({ name })

            const newClasse = classe && Classe.toClasseModel(classe)
            return newClasse

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getAllClasse = async (module_id: string): Promise<classeOutputDTO[]> => {
        try {
            const classe: classeOutputDTO[] = await BaseDatabase.connection(this.TABLE_CLASSE)
                .select()
                .where({ module_id })
                .orderBy('name')

            return classe

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public editClasse = async (id: string, name: string, class_date: string): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_CLASSE)
                .where({ id })
                .update({
                    name: name,
                    class_date: class_date
                })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public deleteClasse = async (id: string): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_CLASSE)
                .where({ id })
                .delete()

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}