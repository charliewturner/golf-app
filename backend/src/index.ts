import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/courses/search", async (req, res) => {
  try {
    const searchQuery = req.query.q; // frontend passes ?q=
    if (!searchQuery) {
      return res.status(400).json({ error: "Missing search query" });
    }

    const response = await fetch(
      `https://api.golfcourseapi.com/v1/search?search_query=${encodeURIComponent(searchQuery)}`,
      {
        headers: { Authorization: `Key ${process.env.API_KEY}` },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.json(data); // passes { courses: [...] } to frontend
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

app.get("/v1/courses/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Fetching course ID:", req.params.id);
  try {
    const response = await fetch(
      `https://api.golfcourseapi.com/v1/courses/${id}`,
      {
        headers: {
          Authorization: `Key ${process.env.API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
