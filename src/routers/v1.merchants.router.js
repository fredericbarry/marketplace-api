import { Router } from "express";

import * as MerchantsControllerV1 from "../controllers/v1.merchants.controller.js";
import { auth } from "../utils/middlewares.js";

const router = Router();

router.post("/", auth, MerchantsControllerV1.createNew);
router.get("/", MerchantsControllerV1.getAll);
router.get("/:id", MerchantsControllerV1.getOne);
router.put("/:id", auth, MerchantsControllerV1.updateOne);
router.delete("/:id", auth, MerchantsControllerV1.deleteOne);

export { router };
