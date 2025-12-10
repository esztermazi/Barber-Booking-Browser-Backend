import express from "express";
import { readJSON, writeJSON } from "../utils/storage.js";
import { v4 as uuid } from "uuid";
import {
  isValidEmail,
  isValidDate,
  isFutureDate,
  isWithinOpeningHours,
  isSunday,
  isHoliday,
} from "../utils/validation.js";

const router = express.Router();

const BOOKINGS_PATH = "./src/data/bookings.json";

router.get("/", (req, res) => {
  const email = req.query.email;
  const bookings = readJSON(BOOKINGS_PATH);
  let result = bookings;

  if (email) {
    result = bookings.filter((b) => b.email === email);
  }

  return res.json(result);
});

router.post("/", (req, res) => {
  const { barberId, date, email } = req.body;

  if (!barberId || !date || !email) {
    return res.status(400).json({ error: "Missing required data" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!isValidDate(date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  if (!isFutureDate(date)) {
    return res.status(400).json({ error: "Cannot book past dates" });
  }

  if (isSunday(date)) {
    return res.status(400).json({ error: "Cannot book on Sundays" });
  }

  if (isHoliday(date)) {
    return res.status(400).json({ error: "Cannot book on public holidays" });
  }

  if (!isWithinOpeningHours(date)) {
    return res
      .status(400)
      .json({ error: "Outside opening hours (07:00–20:00)" });
  }

  const bookings = readJSON(BOOKINGS_PATH);

  const conflict = bookings.some(
    (b) => b.barberId === barberId && b.date === date
  );

  if (conflict) {
    return res.status(409).json({ error: "This time slot is already taken" });
  }

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

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const bookings = readJSON(BOOKINGS_PATH);

  const updated = bookings.filter((b) => b.id !== id);

  writeJSON(BOOKINGS_PATH, updated);

  return res.json({ message: "Successfully deleted" });
});

export default router;
