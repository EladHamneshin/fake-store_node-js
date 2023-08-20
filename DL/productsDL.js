import jsonFile from 'jsonfile';

const products = []

// ----------------------------------------- CRUD -----------------------------------------------------

export function getProducts() {
    return deepCopy(products);
}

export function getProductById(id) {
    const product = products.find(p => p.id === id);
    if (!product) 
        throw new Error(`Product with id: "${id}" not found`);
    
    return deepCopy(product);
}

export function addProduct(product) {
    if(isPidExist(product.id))
        throw new Error(`Product with id: "${product.id}" already exist`);

    products.push(deepCopy(product));
    return updateDb().catch(err => console.log(err));
}

export function addProducts(newProducts) {
    for(const product of newProducts){
        if(isPidExist(product.id))
            throw new Error(`Product with id: "${product.id}" already exist`);
        products.push(deepCopy(product));
    }
    return updateDb().catch(err => console.log(err));
}

export function updateProduct(productId, product) {
    const index = getProductIndexById(productId);
    products[index] = deepCopy(product);
    return updateDb().catch(err => console.log(err));
}

export function deleteProduct(productId) {
    const index = getProductIndexById(productId) 
    products.splice(index, 1);
    return updateDb().catch(err => console.log(err));
}

export function increseProductQuantity(productId) {
    const index = getProductIndexById(productId);
    products[index].quantity++;
    return updateDb().catch(err => console.log(err));
}

export function decreseProductQuantity(productId) {
    const index = getProductIndexById(productId);
    products[index].quantity--;
    return updateDb().catch(err => console.log(err));
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

export function updateDb() {
    return jsonFile.writeFile("data/products.json", { products });
}


// ----------------------------------------- utiles -----------------------------------------------------
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getProductIndexById(productId) {
    const index = products.findIndex(p => p.id === productId);
    if (index === -1)
        throw new Error(`Product with id: "${productId}" not found`);
    return index;
}

function isPidExist(pid) {
    return products.some(p => p.id === pid);
}