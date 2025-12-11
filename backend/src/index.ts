import "tsx/esm";
import express from "express";
// import { auth } from "./middleware/auth.ts";
import barbersRoute from "./routes/barbers.ts";
import bookingsRoute from "./routes/bookings.ts";

const app = express();
app.use(express.json());
// app.use(auth);    // Re-enable later

app.use("/barbers", barbersRoute);
app.use("/bookings", bookingsRoute);

app.get("/", (req, res) => {
  res.json({ message: "BBB Backend API is running" });
});

app.listen(4000);
