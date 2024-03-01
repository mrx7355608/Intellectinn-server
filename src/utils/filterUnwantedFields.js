export function filterUnwantedFields(data, allowedFields) {
    const filteredData = { ...data };
    Object.keys(data).forEach((elem) => {
        if (allowedFields.includes(elem) === false) {
            delete filteredData[elem];
        }
    });
    return filteredData;
}
