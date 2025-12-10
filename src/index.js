import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.json({ message: "BBB Backend API is running"});
})

app.listen(3000);
