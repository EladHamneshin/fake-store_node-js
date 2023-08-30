import * as productsDL from '../DL/productsDL.js';


export function getProducts() {
    return productsDL.getProducts();
}

export function getProductById(id) {
    return productsDL.getProductById(id);
}

export function addProduct(product) {
    productsDL.addProduct(product);
}

export function updateProduct(productId, product) {
    productsDL.updateProduct(productId, product);
}

export function deleteProduct(productId) {
    productsDL.deleteProduct(productId);
}

export function increseProductQuantity(productId) {
    productsDL.increseProductQuantity(productId);
} 

export function decreseProductQuantity(productId) {
    productsDL.decreseProductQuantity(productId);
}