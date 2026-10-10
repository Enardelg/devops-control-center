
import type { ServiceStatus } from "../types/service";

export function ServiceStatusCard({
  name,
  status,
}: ServiceStatus) {
  return (
    <article>
      <h3>{name}</h3>
      <p>
        Estado: <strong>{status}</strong>
      </p>
    </article>
  );
}
