import * as prouctsController from '../controllers/productsController.js';
import express from 'express';

export const router = express.Router();

router.get('/', prouctsController.getProducts);

router.get('/:id', prouctsController.getProductById);

router.post('/', prouctsController.addProduct);

router.put('/:id', prouctsController.updateProduct);

router.delete('/:id', prouctsController.deleteProduct);

router.patch('/increase/:id', prouctsController.increseProductQuantity);

router.patch('/decrease/:id', prouctsController.decreseProductQuantity);

