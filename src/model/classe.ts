export type classeInputDTO = {
    name: string,
    classDate: string,
    moduleId: string
}

export type classeOutputDTO = {
    id: string,
    name: string,
    class_date: string,
    module_id: string
}

export type editClasseInputDTO = {
    id: string,
    name: string,
    classDate: string
}

export class Classe {

    constructor(
        protected id: string,
        protected name: string,
        protected class_date: string,
        protected module_id: string,

    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getClassDate(): string {
        return this.class_date
    }

    public getModuleId(): string {
        return this.module_id
    }

    static toClasseModel(data: Classe) {
        return new Classe(data.id, data.name, data.class_date, data.module_id)
    }
}