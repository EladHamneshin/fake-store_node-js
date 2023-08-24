import express from "express";
import axios from "axios";
import * as productsDL from "./DL/productsDL.js";
import * as usersDL from "./DL/usersDL.js";
import {userRouter} from "./routes/usersRouter.js";
import {productsRouter} from "./routes/productsRouter.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = 3000;

function initServer(app, port) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'))
    app.use("/products", productsRouter);
    app.use("/users", userRouter);

    app.listen(port, () => {

        axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            const products = res.data;
            for(const product of products)
                product.quantity = Math.floor(Math.random() * 100);
        
            return productsDL.addProducts(products).then(() => console.log("Products DB is ready"));
        })
        .then(()=>console.log(`Server is up and running on port:${port}`));

        usersDL.retriveDb().then(() => console.log("Users DB is ready"));
    });

}

initServer(app, port);