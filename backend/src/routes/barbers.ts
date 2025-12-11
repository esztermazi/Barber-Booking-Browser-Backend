import { Router } from "express";
import { BarbersController } from "../controllers/barbers.controller.ts";

const router = Router();

router.get("/", BarbersController.getAll);
router.get("/:id/slots", BarbersController.getSlots);

export default router;
