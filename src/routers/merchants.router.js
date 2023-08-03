import { Router } from "express";

import {
    addMerchant,
    editMerchant,
    getMerchant,
    getMerchants,
    removeMerchant,
} from "../controllers/merchants.controller.js";
import { auth } from "../utils/middlewares.js";

const merchantsRouter = Router();

merchantsRouter.delete("/:id", auth, removeMerchant);
merchantsRouter.get("/", getMerchants);
merchantsRouter.get("/:id", getMerchant);
merchantsRouter.post("/", auth, addMerchant);
merchantsRouter.put("/:id", auth, editMerchant);

export { merchantsRouter };
