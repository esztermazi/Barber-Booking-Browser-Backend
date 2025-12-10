import express from "express";
import { readJSON, writeJSON } from "../utils/storage.js";
import { v4 as uuid } from "uuid";
const router = express.Router()

const BOOKINGS_PATH = "./src/data/bookings.json";

router.get("/", (req, res) => {
  const email = req.query.email;
  const bookings = readJSON(BOOKINGS_PATH);
  let result = bookings;

  if (email) {
    result = bookings.filter(b => b.email === email);
  }

  return res.json(result);
});

router.post("/", (req, res) => {
  const { barberId, date, email } = req.body;

  if (!barberId || !date || !email) {
    return res.status(400).json({ error: "Missing required data" });
  }

  const bookings = readJSON(BOOKINGS_PATH);

  const newBooking = {
    id: uuid(),
    barberId,
    date,
    email,
  };

  bookings.push(newBooking);
  writeJSON(BOOKINGS_PATH, bookings);

  return res.status(201).json(newBooking);
});

export default router;
