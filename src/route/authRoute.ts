import { Router } from "express";
import handler from "../app/user/handler";
import { verify, verifyAdmin } from "../middleware/authToken";

const router = Router();
router.post("/login", handler.userLogin);
router.post("/change-password", verify, handler.changePasswordUser);
router.get("/me", verify, handler.getProfile);

export default router;