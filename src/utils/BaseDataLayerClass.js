export class BaseDataLayerFunctions {
    constructor(model) {
        this._model = model;
    }

    async findAll() {
        const data = await this._model.find({});
        return data;
    }

    async findById(id) {
        const data = await this._model.findById(id);
        return data;
    }

    async insertData(data) {
        const newModelData = await this._model.create(data);
        return newModelData;
    }

    async updateData(id, changes) {
        const updatedModelData = await this._model.findByIdAndUpdate(
            id,
            changes,
            { new: true },
        );
        return updatedModelData;
    }

    async deleteData(id) {
        await this._model.findByIdAndDelete(id);
        return null;
    }
}
