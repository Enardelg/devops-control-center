
import { API_URL } from "../config/api";

export type HealthResponse = {
  status: string;
  service: string;
  fastApiService: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error(
      `Health request failed: ${response.status}`
    );
  }

  return response.json();
}
