import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB";

import authRoutes from "./routes/auth.routes";
import bookingsRoutes from "./routes/bookings.routes";
import messagesRoutes from "./routes/messages.routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// MAIN ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
