import express from "express";
import axios from "axios";
import * as productsDL from "./DL/productsDL.js";
import {router} from "./routes/productsRouter.js";
import morgan from "morgan";

const app = express();
const port = 3000;

function initServer(app, port) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'))
    app.use("/products", router);

    app.listen(port, () => {

        axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            const products = res.data;
            for(const product of products)
                product.quantity = Math.floor(Math.random() * 100);
        
            return productsDL.addProducts(products);
        })
        .then(()=>console.log(`Server is up and running on port:${port}`));

    });

    
}

initServer(app, port);