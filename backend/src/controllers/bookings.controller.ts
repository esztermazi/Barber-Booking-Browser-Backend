import { Request, Response } from "express";
import { BookingsService } from "../services/bookings.service.ts";
import type { Booking, BookingDTO } from "../models/Booking.ts";

export class BookingsController {
  static async getAll(
    req: Request<{}, {}, {}, { email?: string }>,
    res: Response<BookingDTO.List[]>
  ) {
    const bookings = await BookingsService.getAll(req.query.email);
    return res.json(bookings);
  }

  static create(
    req: Request<{}, Booking | { error: string }, BookingDTO.Create>,
    res: Response<Booking | { error: string }>
  ) {
    try {
      const created = BookingsService.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }

  static delete(req: Request<{ id: string }>, res: Response<boolean>) {
    const success = BookingsService.delete(req.params.id);
    return res.json(success);
  }
}
