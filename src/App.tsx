import { ServiceCard } from "./components/ServiceCard";

function App() {
  return (
    <main>
      <h1>DevOps Control Center</h1>

      <ServiceCard
        name="Payment API"
        status="online"
      />

      <ServiceCard
        name="Authentication API"
        status="offline"
      />
    </main>
  );
}

export default App;