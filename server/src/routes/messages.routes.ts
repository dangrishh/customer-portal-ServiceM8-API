import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messages.controller";

const router = Router();

router.get("/:bookingId", getMessages);
router.post("/:bookingId", sendMessage);

export default router;
