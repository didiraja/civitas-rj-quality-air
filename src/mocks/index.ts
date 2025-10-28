import type { AirQualityIndexUAQI, AirPollutionResponse } from '../types/airPollution';

// Gera um objeto aleatório para o índice UAQI
export function randomUAQI(): AirQualityIndexUAQI {
  const aqi = Math.floor(Math.random() * 500) + 1; // valor entre 1 e 500
  let category: string;
  let color: string;

  if (aqi <= 50) {
    category = 'Good';
    color = '#00e400';
  } else if (aqi <= 100) {
    category = 'Moderate';
    color = '#ffff00';
  } else if (aqi <= 150) {
    category = 'Unhealthy for Sensitive Groups';
    color = '#ff7e00';
  } else if (aqi <= 200) {
    category = 'Unhealthy';
    color = '#ff0000';
  } else if (aqi <= 300) {
    category = 'Very Unhealthy';
    color = '#8f3f97';
  } else {
    category = 'Hazardous';
    color = '#7e0023';
  }

  const dominantPollutants = ['pm2_5', 'no2', 'o3', 'so2'];
  const dominantPollutant = dominantPollutants[
    Math.floor(Math.random() * dominantPollutants.length)
  ];

  return {
    code: 'UAQI',
    displayName: 'Universal Air Quality Index',
    aqi,
    aqiDisplay: aqi.toString(),
    category,
    dominantPollutant,
    color,
  };
}

// Gera recomendações de saúde baseadas no AQI
export function generateHealthRecommendations(aqi: number): string[] {
  const recommendations: string[] = [];

  if (aqi <= 50) {
    recommendations.push('Qualidade do ar boa — aproveite atividades ao ar livre.');
  }
  if (aqi > 50) {
    recommendations.push('Evite exercícios ao ar livre se pertence a grupo sensível.');
  }
  if (aqi > 100) {
    recommendations.push('Reduza o tempo de permanência ao ar livre.');
  }
  if (aqi > 150) {
    recommendations.push('População geral deve limitar atividades externas intensas.');
  }
  if (aqi > 200) {
    recommendations.push('Considere usar máscara N95 quando estiver fora de ambientes fechados.');
  }
  if (aqi > 300) {
    recommendations.push('Evite sair de casa se possível — situação de risco elevado.');
  }

  // Sempre adicionar uma recomendação genérica
  recommendations.push('Mantenha portas e janelas fechadas em dias críticos.');

  return recommendations;
}

// Exemplo de gerar uma resposta mockada completa
export function mockAirPollutionResponse(lat: string, lon: string): AirPollutionResponse {
  const index = randomUAQI();
  return {
    coordinates: { lat, lon },
    dateTime: new Date().toISOString(),
    regionCode: "BR-RJ",
    indexes: [index],
    "pollutants": [
      {
        "code": "pm2_5",
        "displayName": "PM2.5",
        "fullName": "Particulate Matter ≤2.5µm",
        "concentration": {
          "value": 35.4,
          "units": "µg/m³"
        },
        "additionalInfo": {
          "percentile": 75
        }
      },
      {
        "code": "no2",
        "displayName": "NO₂",
        "fullName": "Nitrogen Dioxide",
        "concentration": {
          "value": 48.2,
          "units": "ppb"
        },
        "additionalInfo": {
          "trafficContribution": "high"
        }
      },
      {
        "code": "o3",
        "displayName": "O₃",
        "fullName": "Ozone",
        "concentration": {
          "value": 120.1,
          "units": "µg/m³"
        }
      }
    ],
    healthRecommendations: generateHealthRecommendations(index.aqi),
  };
}
