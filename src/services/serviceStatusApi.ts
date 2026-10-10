
import { API_URL } from "../config/api";
import type { ServiceStatus } from "../types/service";

export async function getServices(): Promise<ServiceStatus[]> {
  const response = await fetch(`${API_URL}/api/services`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch services: ${response.status}`
    );
  }

  return response.json();
}
