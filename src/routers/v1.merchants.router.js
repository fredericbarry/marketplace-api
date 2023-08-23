import { Router } from "express";

import {
    addMerchant,
    editMerchant,
    getMerchant,
    getMerchants,
    removeMerchant,
} from "../controllers/v1.merchants.controller.js";
import { auth } from "../utils/middlewares.js";

const router = Router();

router.delete("/:id", auth, removeMerchant);
router.get("/", getMerchants);
router.get("/:id", getMerchant);
router.post("/", auth, addMerchant);
router.put("/:id", auth, editMerchant);

export { router };
