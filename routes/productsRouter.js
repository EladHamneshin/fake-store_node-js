import * as prouctsController from '../controllers/productsController.js';
import express from 'express';

export const productsRouter = express.Router();

productsRouter.get('/', prouctsController.getProducts);

productsRouter.get('/:id', prouctsController.getProductById);

productsRouter.post('/', prouctsController.addProduct);

productsRouter.put('/:id', prouctsController.updateProduct);

productsRouter.delete('/:id', prouctsController.deleteProduct);

productsRouter.patch('/increase/:id', prouctsController.increseProductQuantity);

productsRouter.patch('/decrease/:id', prouctsController.decreseProductQuantity);