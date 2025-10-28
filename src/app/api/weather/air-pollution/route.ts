import { NextResponse } from 'next/server';
import { mockAirPollutionResponse } from '../../../../mocks';

/*
  @description: Response inspirada na Google Air Quality API
  
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

  const output = mockAirPollutionResponse(lat, lon)


  return NextResponse.json(output, { status: 200 });
}
