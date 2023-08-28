import * as productsBL from '../BL/productsBL.js';

export function getProducts(req, res) {
    res.send(productsBL.getProducts());
}

export function getProductById(req, res) {
    try{
        const id = req.params.id;
        res.send(productsBL.getProductById(id));
    } catch(err) {
        res.send(err.message);
    }
}

export function addProduct(req, res) {
    try{
        const product = req.body;
        productsBL.addProduct(product);
        res.send(product);
    } catch(err) {
        res.send(err.message);
    }
}

export function updateProduct(req, res) {
    try{
        const id = +req.params.id;
        const product = req.body;
        productsBL.updateProduct(id ,product);
        res.send(productsBL.getProducts());
    } catch(err) {
        res.send(err.message);
    }
}

export function deleteProduct(req, res) {
    try{
        const id = +req.params.id;
        productsBL.deleteProduct(id);
        res.send(productsBL.getProducts());
    } catch(err) {
        res.send(err.message);
    }
}

export function increseProductQuantity(req, res) {
    const id = req.params.id;
    try{
        productsBL.increseProductQuantity(id);
        res.send(productsBL.getProducts());
    } catch(err) {
        res.send(err.message);
    }
}

export function decreseProductQuantity(req, res) {
    const id = req.params.id;
    try{
        productsBL.decreseProductQuantity(id);
        res.send(productsBL.getProducts());
    } catch(err) {
        res.send(err.message);
    }
}