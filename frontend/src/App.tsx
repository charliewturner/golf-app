import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState<string>("loading...");

  // useEffect(() => {
  //   fetch("http://localhost:8000/health")
  //     .then((r) => r.json())
  //     .then((d) => {
  //       console.log("Health response:", d);
  //       setStatus(d.ok ? "API OK" : "API not ok");
  //     })

  //     .catch(() => setStatus("API error"));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:8000/courses/search")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <div style={{ padding: 16 }}>
        <h1>Golf Tracker</h1>
        <p>API STATUS: {status}</p>
      </div>
    </>
  );
}
