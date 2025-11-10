import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'E-Mail und Passwort werden benötigt',
        },
        { status: 400 }
      );
    }

    // Mock login for development
    const emailLower = email.toLowerCase();
    let role: 'employee' | 'manager' | 'admin' = 'employee';
    let name = 'Demo Employee';
    let department = 'Development';
    let position = 'Software Engineer';
    
    if (emailLower.includes('admin')) {
      role = 'admin';
      name = 'Admin User';
      department = 'IT';
      position = 'System Administrator';
    } else if (emailLower.includes('manager') || emailLower.includes('david')) {
      role = 'manager';
      name = 'David Manager';
      department = 'Operations';
      position = 'Teamleiter';
    }
    
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      role: role,
      department: department,
      position: position,
      timezone: 'Europe/Berlin',
      isActive: true,
      lastLogin: new Date()
    };
    
    return NextResponse.json(
      {
        success: true,
        message: 'Erfolgreich angemeldet',
        user: mockUser,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Interner Server Fehler',
      },
      { status: 500 }
    );
  }
}
