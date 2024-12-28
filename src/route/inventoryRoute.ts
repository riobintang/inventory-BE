import { Router } from "express";
import handler from "../app/inventory/handler";
import { verify, verifyAdmin } from "../middleware/authToken";

const router = Router();

router.get("/", verify, handler.getAllInventories);
router.get("/:id", verify, handler.getInventoryById);
router.post("/add", verify, verifyAdmin, handler.addInventory);
router.put("/:id", verify, verifyAdmin, handler.updateInventory);
router.delete("/:id", verify, verifyAdmin, handler.removeInventory);

export default router;