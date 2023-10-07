import { Router } from "express";

import * as MerchantsControllerV1 from "../controllers/v1.merchants.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", auth, MerchantsControllerV1.createOne);
router.get("/", MerchantsControllerV1.readAll);
router.get("/:id", MerchantsControllerV1.readOne);
router.put("/:id", auth, MerchantsControllerV1.updateOne);
router.delete("/:id", auth, MerchantsControllerV1.deleteOne);

export { router };
