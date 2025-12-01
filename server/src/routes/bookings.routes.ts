import { Router } from "express";
import {
  getBookings,
  getBookingDetails,
  getAttachments,
} from "../controllers/bookings.controller";

const router = Router();

router.get("/", getBookings);
router.get("/:id", getBookingDetails);
router.get("/:id/attachments", getAttachments);

export default router;
