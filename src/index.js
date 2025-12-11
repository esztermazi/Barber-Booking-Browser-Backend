import express from "express";
// import { auth } from "./middleware/auth.js";
import barbersRoute from "./routes/barbers.js";
import bookingsRoute from "./routes/bookings.js";

const app = express();
app.use(express.json());
// app.use(auth);    // Re-enable later

app.use("/barbers", barbersRoute);
app.use("/bookings", bookingsRoute);

app.get("/", (req, res) => {
  res.json({ message: "BBB Backend API is running" });
});

app.listen(3000);
