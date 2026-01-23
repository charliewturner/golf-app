import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/courses/search", async (_req, res) => {
  try {
    const response = await fetch("https://api.golfcourseapi.com/v1/search", {
      headers: {
        Authorization: `Key ${process.env.API_KEY}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "GolfCourseAPI error",
        details: text,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
