import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { TimerSession } from '@/models/TimerSession';

async function connectDB(): Promise<void> {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/timetracker-pro');
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
    
    await session.completeSession();
    
    return NextResponse.json({
      success: true,
      message: 'Timer gestoppt und gespeichert',
      session
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Laufende Session für User finden
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
    
    // Laufende Session finden
    const runningSession = await TimerSession.findOne({ 
      userId, 
      status: 'running' 
    });
    
    // Vergangene Sessions
    const pastSessions = await TimerSession.find({ 
      userId, 
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
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
