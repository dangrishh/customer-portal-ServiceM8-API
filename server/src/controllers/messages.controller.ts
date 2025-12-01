import { Request, Response } from "express";
import Message from "../models/Message";

export const getMessages = async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const messages = await Message.find({ bookingId }).sort({ createdAt: 1 });

  res.json(messages);
};

export const sendMessage = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { message } = req.body;

  const newMessage = await Message.create({
    bookingId,
    message,
    sender: "customer",
  });

  res.json(newMessage);
};
