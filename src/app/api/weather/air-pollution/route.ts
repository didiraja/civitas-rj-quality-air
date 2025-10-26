import { NextResponse } from 'next/server';

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

  return NextResponse.json({ message: "api ok" }, { status: 200 });
}
