import axios from "axios";
import { config } from "dotenv";
config();

export async function fetchBarbers() {
  try {
    const response = await axios.get(process.env.API_URL, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });

    return response.data;
  } catch (err) {
    console.error("External API error:", err.response?.data || err.message);
    throw new Error("Failed to fetch barbers");
  }
}
