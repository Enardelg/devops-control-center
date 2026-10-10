
import { useEffect, useState } from "react";
import {
  getHealth,
  type HealthResponse,
} from "../services/healthApi";

export function BackendStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadHealth() {
      try {
        const data = await getHealth();

        if (active) {
          setHealth(data);
        }
      } catch {
        if (active) {
          setError("No se pudo conectar con Spring Boot");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadHealth();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p>Consultando el backend...</p>;
  }

  if (error) {
    return <p role="alert">Backend: DOWN — {error}</p>;
  }

  if (!health) {
    return <p>Sin información del backend</p>;
  }

  return (
    <section>
      <h2>Estado de Spring Boot</h2>
      <p>Servicio: {health.service}</p>
      <p>Estado: {health.status}</p>
    </section>
  );
}
