import { NextResponse } from 'next/server';

export async function POST() {
  // In a real app, you would invalidate the session/token
  return NextResponse.json(
    {
      success: true,
      message: 'Erfolgreich abgemeldet',
    },
    { status: 200 }
  );
}
