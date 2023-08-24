import { Router } from "express";

import * as ProductsControllerV1 from "../controllers/v1.products.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", auth, ProductsControllerV1.createNew);
router.get("/", ProductsControllerV1.getAll);
router.get("/:id", ProductsControllerV1.getOne);
router.put("/:id", auth, ProductsControllerV1.updateOne);
router.delete("/:id", auth, ProductsControllerV1.deleteOne);

export { router };
