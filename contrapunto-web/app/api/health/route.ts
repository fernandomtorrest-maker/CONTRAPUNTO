import { NextResponse } from 'next/server';

// Health check endpoint para Docker HEALTHCHECK y load balancers
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'contrapunto-web',
    },
    { status: 200 }
  );
}
