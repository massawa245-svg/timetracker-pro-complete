// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '@/models/User';

async function connectDB(): Promise<void> {
  if (mongoose.connections[0].readyState) return;
  
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}

export async function POST(request: Request) {
  try {
    await connectDB();

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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ein Benutzer mit dieser E-Mail existiert bereits',
        },
        { status: 409 }
      );
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password, // In production, hash this password!
      role: 'employee',
      department: 'Allgemein',
      position: 'Mitarbeiter',
      isActive: true
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Benutzer erfolgreich registriert',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          position: user.position
        },
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