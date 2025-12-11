import { Request, Response } from "express";
import { BarbersService } from "../services/barbers.service.ts";
import type { Barber, BarberSlotDTO } from "../models/Barber.ts";

export class BarbersController {
  static async getAll(
    _req: Request,
    res: Response<Barber[] | { error: string }>
  ) {
    try {
      const barbers = await BarbersService.fetchAll();
      return res.json(barbers);
    } catch (_err) {
      return res.status(500).json({ error: "Could not load barbers" });
    }
  }

  static getSlots(
    req: Request<{ id: string }, any, any, { date?: string }>,
    res: Response<BarberSlotDTO[] | { error: string }>
  ) {
    const barberId = req.params.id;
    const date = req.query.date;

    if (!date) {
      return res.status(400).json({ error: "Missing date parameter" });
    }

    try {
      const result = BarbersService.computeSlots(barberId, date);
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }
}
