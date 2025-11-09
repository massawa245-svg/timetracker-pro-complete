import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { TimerSession } from '@/models/TimerSession';

async function connectDB(): Promise<void> {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/timetracker-pro');
}

interface TimerSessionRequest {
  userId: string;
  project: string;
  description?: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    let query = {};
    if (userId) {
      query = { userId };
    }
    
    const sessions = await TimerSession.find(query)
      .populate('userId', 'name email role')
      .sort({ startTime: -1 });
    
    return NextResponse.json({ 
      success: true, 
      sessions 
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    
    const body: TimerSessionRequest = await request.json();
    const { userId, project, description } = body;
    
    if (!userId || !project) {
      return NextResponse.json(
        { success: false, error: 'UserId und Project sind erforderlich' },
        { status: 400 }
      );
    }
    
    // Neue Session erstellen
    const newSession = new TimerSession({
      userId,
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
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
