import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";

config();

const SERVER_KEY = process.env.API_KEY;

if (!SERVER_KEY) {
  throw new Error("Missing API_KEY environment variable");
}

export function auth(req: Request, res: Response, next: NextFunction): void {
  const clientKey = req.headers["x-api-key"];

  if (typeof clientKey !== "string" || clientKey !== SERVER_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
