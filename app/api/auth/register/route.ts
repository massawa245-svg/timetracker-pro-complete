import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Bitte füllen Sie alle Pflichtfelder aus',
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Passwort muss mindestens 6 Zeichen lang sein',
        },
        { status: 400 }
      );
    }

    // Mock registration
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      role: 'employee' as const,
      department: 'Allgemein',
      position: 'Mitarbeiter',
      isActive: true,
      lastLogin: new Date()
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Benutzer erfolgreich registriert',
        user: mockUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Interner Server Fehler',
      },
      { status: 500 }
    );
  }
}
