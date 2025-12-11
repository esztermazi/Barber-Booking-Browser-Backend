import { Router } from "express";
import { BookingsController } from "../controllers/bookings.controller.ts";

const router = Router();

router.get("/", BookingsController.getAll);
router.post("/", BookingsController.create);
router.delete("/:id", BookingsController.delete);

export default router;
