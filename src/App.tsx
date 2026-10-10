import { useEffect } from "react";
import { API_URL } from "./config/api";
import { getHealth } from "./services/healthApi";

function App() {
  useEffect(() => {
  getHealth()
    .then((data) => {
      console.log("Backend health:", data);
    })
    .catch((error) => {
      console.error("Backend error:", error);
    });
}, []);
  return (
    <main>
      <h1>Portfolio Platform</h1>

      <p>Frontend status: Running</p>
      <p>API configured: {API_URL}</p>
    </main>
  );
}

export default App;