import { NextResponse } from 'next/server';

export async function GET() {
  // Simplified check - in real app, verify JWT token or session
  return NextResponse.json(
    {
      success: false,
      message: 'Nicht authentifiziert',
    },
    { status: 401 }
  );
}
