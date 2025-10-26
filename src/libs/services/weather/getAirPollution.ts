import { useQuery } from "@tanstack/react-query";
import { AirPollutionResponse } from "../../../types/airPollution";

type AirPollutionParams = { lat: number; lon: number }

type AirPollutionQuery = AirPollutionParams & { enabled: boolean }

export default async function GetAirPollution({ lat, lon }: AirPollutionParams): Promise<AirPollutionResponse> {

  try {
    const response = await fetch(`/api/weather/air-pollution?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return response.json();
  } catch (error) {
    throw error
  }
}

export const useAirPollution = ({ lat, lon, enabled }: AirPollutionQuery) => {
  return useQuery({
    queryKey: ['air-pollution', { lat, lon }],
    queryFn: () => GetAirPollution({ lat, lon }),
    enabled,
  });
}