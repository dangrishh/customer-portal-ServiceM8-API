import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({ message: "Email and phone required" });
  }

  return res.json({
    token: "mocked-token",
    customerId: email,
  });
};
