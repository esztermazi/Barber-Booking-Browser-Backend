import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`BBB Backend API is running on http://localhost:${PORT}`);
});
