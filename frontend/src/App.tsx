import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState<string>("loading...");

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then((r) => r.json())
      .then((d) => setStatus(d.ok ? "API OK" : "API not ok"))
      .catch(() => setStatus("API error"));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Golf Tracker</h1>
      <p>{status}</p>
    </div>
  );
}
