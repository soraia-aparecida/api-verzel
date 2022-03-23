export type ModuleInputDTO = {
    name: string
}

export class Module {

    constructor(
        protected id: string,
        protected name: string,

    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    static toModuleModel(data: Module) {
        return new Module(data.id, data.name)
    }
}