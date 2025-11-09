import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';

// MongoDB verbinden
async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/timetracker-pro');
}

export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email und Passwort sind erforderlich' },
        { status: 400 }
      );
    }
    
    // User finden
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Anmeldedaten' },
        { status: 401 }
      );
    }
    
    // Passwort vergleichen
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Anmeldedaten' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Login erfolgreich',
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Fehler' },
      { status: 500 }
    );
  }
}
