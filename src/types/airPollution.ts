export interface PollutantConcentration {
  value: number;
  units: string;
}

export interface Pollutant {
  code: string;
  displayName: string;
  fullName?: string;
  concentration: PollutantConcentration;
  additionalInfo?: Record<string, unknown>;
}

export interface AirQualityIndexUAQI {
  code: "UAQI";
  displayName: string;
  aqi: number;
  aqiDisplay: string;
  category: string;
  dominantPollutant?: string;
  color?: string;
}

export interface AirPollutionResponse {
  coordinates: {
    lat: string;
    lon: string;
  };
  dateTime: string;
  regionCode?: string;
  indexes: AirQualityIndexUAQI[];
  pollutants: Pollutant[];
  healthRecommendations?: string[];
}