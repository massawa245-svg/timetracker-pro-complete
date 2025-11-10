import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { TimerSession } from '@/models/TimerSession';

async function connectDB(): Promise<void> {
  try {
    if (mongoose.connections[0].readyState) return;
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(' MongoDB connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    throw error;
  }
}

// Neue Timer Session starten
export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    
    const body = await request.json();
    const { userId, project, description } = body;
    
    if (!userId || !project) {
      return NextResponse.json(
        { success: false, error: 'UserId und Project sind erforderlich' },
        { status: 400 }
      );
    }
    
    // Demo: Erstelle einen einfachen User ObjectId falls nicht vorhanden
    const demoUserId = userId === 'demo-user-id' ? new mongoose.Types.ObjectId() : userId;
    
    // Neue Session erstellen
    const newSession = new TimerSession({
      userId: demoUserId,
      project,
      description: description || '',
      startTime: new Date(),
      status: 'running'
    });
    
    await newSession.save();
    
    return NextResponse.json({
      success: true,
      message: 'Timer gestartet',
      session: newSession
    });
    
  } catch (error) {
    console.error('Timer POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Datenbank Fehler: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// Timer Session beenden
export async function PUT(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'SessionId ist erforderlich' },
        { status: 400 }
      );
    }
    
    const session = await TimerSession.findById(sessionId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session nicht gefunden' },
        { status: 404 }
      );
    }
    
    session.endTime = new Date();
    session.duration = Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 1000);
    session.status = 'completed';
    
    await session.save();
    
    return NextResponse.json({
      success: true,
      message: 'Timer gestoppt und gespeichert',
      session
    });
    
  } catch (error) {
    console.error('Timer PUT error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Datenbank Fehler: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// Sessions abrufen
export async function GET(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'UserId ist erforderlich' },
        { status: 400 }
      );
    }
    
    // Demo: Erstelle einen einfachen User ObjectId
    const demoUserId = userId === 'demo-user-id' ? new mongoose.Types.ObjectId() : userId;
    
    // Laufende Session finden
    const runningSession = await TimerSession.findOne({ 
      userId: demoUserId, 
      status: 'running' 
    });
    
    // Vergangene Sessions
    const pastSessions = await TimerSession.find({ 
      userId: demoUserId, 
      status: 'completed' 
    })
    .sort({ startTime: -1 })
    .limit(10);
    
    return NextResponse.json({ 
      success: true, 
      runningSession,
      pastSessions 
    });
    
  } catch (error) {
    console.error('Timer GET error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Datenbank Fehler: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}
