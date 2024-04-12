export function BaseDataLayerFunctions(model) {
    const findAll = async () => {
        const data = await model.find({}).sort("-createdAt");
        return data;
    };

    const findById = async (id) => {
        const data = await model.findById(id);
        return data;
    };

    const insertData = async (data) => {
        const newModelData = await model.create(data);
        return newModelData;
    };

    const updateData = async (id, changes) => {
        const updatedModelData = await model.findByIdAndUpdate(id, changes, {
            new: true,
        });
        return updatedModelData;
    };

    const deleteData = async (id) => {
        await model.findByIdAndDelete(id);
        return null;
    };

    return {
        findAll,
        findById,
        insertData,
        updateData,
        deleteData,
    };
}
