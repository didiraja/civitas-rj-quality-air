import { NextResponse } from 'next/server';

/*
  @description: Response insipiarada na Google Air Quality API
  
  @see: https://developers.google.com/maps/documentation/air-quality/current-conditions?hl=pt-br
**/
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude e Longitude são obrigatórios.' },
      { status: 400 }
    );
  }

  const output = {
    "coordinates": {
      "lat": -22.9068,
      "lon": -43.1729
    },
    "dateTime": "2025-10-26T15:00:00.000Z",
    "regionCode": "BR-RJ",
    "indexes": [
      {
        "code": "UAQI",
        "displayName": "Universal Air Quality Index",
        "aqi": 95,
        "aqiDisplay": "95",
        "category": "Moderate",
        "dominantPollutant": "pm2_5",
        "color": "#ffcc00"
      }
    ],
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
        "displayName": "Nitrogen Dioxide",
        "fullName": "NO₂",
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
        "displayName": "Ozone",
        "fullName": "O₃",
        "concentration": {
          "value": 120.1,
          "units": "µg/m³"
        }
      }
    ],
    "healthRecommendations": [
      "Evite exercícios ao ar livre se pertencente a grupo sensível",
      "Mantenha portas e janelas fechadas",
      "Considere usar purificador de ar interno"
    ]
  }


  return NextResponse.json(output, { status: 200 });
}
