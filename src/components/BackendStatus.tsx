import { useEffect, useState } from "react";
import {
  getHealth,
  type HealthResponse,
} from "../services/healthApi";

export function BackendStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadHealth() {
      try {
        const data = await getHealth();

        if (active) {
          setHealth(data);
          setError(null);
        }
      } catch {
        if (active) {
          setError("No se pudo conectar con Spring Boot");
          setHealth(null);
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
  }, [attempt]);

  function refreshStatus() {
    setLoading(true);
    setError(null);
    setAttempt((current) => current + 1);
  }

  if (loading) {
    return <p>Consultando el backend...</p>;
  }

  if (error) {
    return (
      <section>
        <h2>Estado de Spring Boot</h2>

        <p role="alert">
          Backend: DOWN — {error}
        </p>

        <button type="button" onClick={refreshStatus}>
          Reintentar conexión
        </button>
      </section>
    );
  }

  if (!health) {
    return (
      <section>
        <p>Sin información del backend</p>

        <button type="button" onClick={refreshStatus}>
          Reintentar conexión
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2>Estado de Spring Boot</h2>

      <p>Servicio: {health.service}</p>
      <p>Spring Boot API: {health.status}</p>
      <p>FastAPI Service: {health.fastApiService}</p>

      <button type="button" onClick={refreshStatus}>
        Actualizar estado
      </button>
    </section>
  );
}