
import { API_URL } from "./config/api";
import { BackendStatus } from "./components/BackendStatus";
import { ServicesDashboard } from "./components/ServicesDashboard";

function App() {
  return (
    <main>
      <h1>Portfolio Platform</h1>

      <p>Frontend status: Running</p>
      <p>API configured: {API_URL}</p>

      <BackendStatus />
      <ServicesDashboard />
    </main>
  );
}

export default App;
