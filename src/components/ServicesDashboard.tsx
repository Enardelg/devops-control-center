import { useEffect, useState } from "react";
import { getServices } from "../services/serviceStatusApi";
import type { ServiceStatus } from "../types/service";
import { ServiceStatusCard } from "./ServiceStatusCard";

type ServicesDashboardProps = {
  refreshKey: number;
};

export function ServicesDashboard({
  refreshKey,
}: ServicesDashboardProps) {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadServices() {
      setLoading(true);
      setError(null);

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
  }, [refreshKey]);

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