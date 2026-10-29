import { useState } from "react";

import { API_URL } from "./config/api";
import { BackendStatus } from "./components/BackendStatus";
import { ServicesDashboard } from "./components/ServicesDashboard";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function refreshAll() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <main>
      <h1>Portfolio Platform</h1>

      <p>Frontend status: Running</p>
      <p>API configured: {API_URL}</p>

      <button type="button" onClick={refreshAll}>
        Actualizar todos los servicios
      </button>

      <BackendStatus refreshKey={refreshKey} />
      <ServicesDashboard refreshKey={refreshKey} />
    </main>
  );
}

export default App;