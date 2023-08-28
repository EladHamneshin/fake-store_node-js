export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function getObjIndexById(arr ,id) {
    const index = arr.findIndex(o => o.id === id);
    if (index === -1)
        throw new Error(`Object with id: "${id}" not found`);
    return index;
}

export function isIdExist(arr, id) {
    return arr.some(o => o.id === id);
}
