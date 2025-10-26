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

  // Simula uma resposta de API de clima
  const mockData = {
    coordenadas: { lat: Number(lat), lon: Number(lon) },
    temperatura: (Math.random() * 10 + 20).toFixed(1), // 20–30°C
    umidade: Math.floor(Math.random() * 40 + 40), // 40–80%
    condicao: ['Ensolarado', 'Nublado', 'Chuvoso', 'Parcialmente nublado'][
      Math.floor(Math.random() * 4)
    ],
    atualizado_em: new Date().toISOString(),
  };

  return NextResponse.json({ message: "api ok" }, { status: 200 });
}
