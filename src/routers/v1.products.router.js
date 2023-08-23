import { Router } from "express";

import {
    addProduct,
    editProduct,
    getProduct,
    getProducts,
    removeProduct,
} from "../controllers/v1.products.controller.js";
import { auth } from "../utils/middlewares.js";

const productsRouter = Router();

productsRouter.delete("/:id", auth, removeProduct);
productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProduct);
productsRouter.post("/", auth, addProduct);
productsRouter.put("/:id", auth, editProduct);

export { productsRouter };
