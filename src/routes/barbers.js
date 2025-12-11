import express from "express";
import { fetchBarbers } from "../services/barberService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const barbers = await fetchBarbers();
    res.json(barbers);
  } catch (err) {
    res.status(500).json({ error: "Could not load barbers" });
  }
});

export default router;
