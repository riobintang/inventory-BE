import { Router } from "express";
import handler from "../app/user/handler";
import { verify, verifyAdmin } from "../middleware/authToken";

const router = Router();

router.get("/all", verify, verifyAdmin, handler.getAllUser);
router.get("/:id", verify, verifyAdmin, handler.getUserById);

router.post("/add", verify, verifyAdmin,handler.addAuditor);
router.post("/resetpassword/:id", verify, verifyAdmin, handler.resetPasswordAuditor);
router.put("/setactive/:id", verify, verifyAdmin, handler.settingActiveUser);
router.delete("/:id", verify, verifyAdmin, handler.deleteUser);

export default router;