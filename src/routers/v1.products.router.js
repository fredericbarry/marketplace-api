import { Router } from "express";

import * as ProductsControllerV1 from "../controllers/v1.products.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", auth, ProductsControllerV1.createOne);
router.get("/", ProductsControllerV1.readAll);
router.get("/:id", ProductsControllerV1.readOne);
router.put("/:id", auth, ProductsControllerV1.updateOne);
router.delete("/:id", auth, ProductsControllerV1.deleteOne);
router.post("/add-merchant", auth, ProductsControllerV1.addMerchant);

export { router };
