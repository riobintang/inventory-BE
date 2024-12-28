import { Router } from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import typeRoute from "./typeRoute";
import inventoryRoute from "./inventoryRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/types", typeRoute);
router.use("/inventories", inventoryRoute);

export default router;