
import { useEffect, useState } from "react";
import { getServices } from "../services/serviceStatusApi";
import type { ServiceStatus } from "../types/service";
import { ServiceStatusCard } from "./ServiceStatusCard";

export function ServicesDashboard() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadServices() {
      try {
        const data = await getServices();

        if (active) {
          setServices(data);
        }
      } catch {
        if (active) {
          setError("No se pudieron cargar los servicios");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h2>Servicios monitoreados</h2>

      {services.map((service) => (
        <ServiceStatusCard
          key={service.name}
          {...service}
        />
      ))}
    </section>
  );
}
