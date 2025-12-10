import express from "express";
import { auth } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(auth);

app.get('/', (req, res) => {
    res.json({ message: "BBB Backend API is running"});
})

app.listen(3000);
