import { Router } from "express";

import handler from "../app/type/handler";

import { verify, verifyAdmin } from "../middleware/authToken";

const router = Router();

router.get("/", verify, handler.getAllType);
router.get("/:id", verify, handler.getTypeById);
router.post("/add", verify, verifyAdmin, handler.createType);
router.put("/:id", verify, verifyAdmin, handler.editType);
router.delete("/:id", verify, verifyAdmin, handler.deleteType);

export default router;