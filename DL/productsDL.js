import jsonFile from 'jsonfile';
import * as utils from './DLUtils.js';

const products = []

// ----------------------------------------- CRUD -----------------------------------------------------

export function getProducts() {
    return utils.deepCopy(products);
}

export function getProductById(id) {
    const product = products.find(p => p.id === id);
    if (!product) 
        throw new Error(`Product with id: "${id}" not found`);
    
    return utils.deepCopy(product);
}

export function addProduct(product) {
    if(utils.isIdExist(products ,product.id))
        throw new Error(`Product with id: "${product.id}" already exist`);

    products.push(utils.deepCopy(product));
    updateDb().then(()=>console.log("db updated successfully")).catch(err => console.log(err));
}

export async function addProducts(newProducts) {
    for(const product of newProducts){
        if(utils.isIdExist(products ,product.id))
            throw new Error(`Product with id: "${product.id}" already exist`);
        products.push(utils.deepCopy(product));
    }
    return updateDb().then(()=>console.log("db updated successfully")).catch(err => console.log(err));
}

export function updateProduct(productId, product) {
    const index = utils.getObjIndexById(products ,productId);
    products[index] = {...product};
    updateDb().then(()=>console.log("db updated successfully")).catch(err => console.log(err));
}

export function deleteProduct(productId) {
    const index = utils.getObjIndexById(products ,productId);
    products.splice(index, 1); 
    updateDb().then(()=>console.log("db updated successfully")).catch(err => console.log(err));
}

export function increseProductQuantity(productId) {
    const index = utils.getObjIndexById(products ,productId);
    products[index].quantity++;
    updateDb().then(()=>console.log("db updated successfully")).catch(err => console.log(err));
}

export function decreseProductQuantity(productId) {
    const index = utils.getObjIndexById(products ,productId);
    products[index].quantity--;
    updateDb().then(()=>console.log("db updated successfully")).catch(err => console.log(err));
}


//-------------------------------------- DB operatins -------------------------------------------
export function retriveDb() {
    return new Promise((resolve, reject) => {
        jsonFile.readFile("data/products.json", (err, obj) => {
            if (err) reject(err);
            else {
                data = obj.users;
                resolve();
            }
        });
    })
}

export function updateDb(){
    return jsonFile.writeFile("data/products.json", { products });
}
