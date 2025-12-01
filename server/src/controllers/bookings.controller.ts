import { Request, Response } from "express";
import { serviceM8 } from "../services/serviceM8";

export const getBookings = async (req: Request, res: Response) => {
  try {
    const customerId = req.query.customerId as string;

    const response = await serviceM8.get(`/job.json?client=${customerId}`);

    res.json(response.data);
  } catch (err) {
    console.error("ServiceM8 error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const getBookingDetails = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;

    const response = await serviceM8.get(`/job/${bookingId}.json`);

    res.json(response.data);
  } catch (err) {
    console.error("ServiceM8 error:", err);
    res.status(500).json({ message: "Failed to fetch booking details" });
  }
};

export const getAttachments = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;

    const response = await serviceM8.get(`/job/${bookingId}/attachment.json`);

    res.json(response.data);
  } catch (err) {
    console.error("Attachment error:", err);
    res.status(500).json({ message: "Failed to fetch attachments" });
  }
};
