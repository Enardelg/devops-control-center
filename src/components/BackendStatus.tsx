import { useEffect, useState } from "react";
import {
  getHealth,
  type HealthResponse,
} from "../services/healthApi";

type BackendStatusProps = {
  refreshKey: number;
};

export function BackendStatus({ refreshKey }: BackendStatusProps) {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadHealth() {
      setLoading(true);

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
  }, [refreshKey]);

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
      </section>
    );
  }

  if (!health) {
    return (
      <section>
        <p>Sin información del backend</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Estado de Spring Boot</h2>

      <p>Servicio: {health.service}</p>
      <p>Spring Boot API: {health.status}</p>
      <p>FastAPI Service: {health.fastApiService}</p>
    </section>
  );
}