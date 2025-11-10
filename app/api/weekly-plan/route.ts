import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { WorkSchedule } from '@/models/WorkSchedule';

// MongoDB Connection
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

//  GET - Wochenplan für alle User abrufen
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    
    console.log(' GET Weekly Plan - Searching for published plan...');
    
    // Finde den zuletzt veröffentlichten Wochenplan
    const weeklyPlan = await WorkSchedule.findOne({
      isWeeklyPlan: true,
      planPublished: true
    })
    .sort({ publishedAt: -1 })
    .select('weeklyPlan publishedAt publishedBy');

    console.log(' Weekly Plan found:', !!weeklyPlan);

    if (!weeklyPlan) {
      return NextResponse.json({ 
        success: true, 
        weeklyPlan: null,
        message: 'Kein Wochenplan verfügbar' 
      });
    }

    return NextResponse.json({ 
      success: true, 
      weeklyPlan: {
        _id: weeklyPlan._id,
        weeklyPlan: weeklyPlan.weeklyPlan,
        publishedAt: weeklyPlan.publishedAt,
        publishedBy: weeklyPlan.publishedBy
      }
    });
    
  } catch (error) {
    console.error(' Weekly plan fetch error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      message: 'Fehler beim Laden des Wochenplans'
    }, { status: 500 });
  }
}

//  POST - Wochenplan erstellen/veröffentlichen (Für Manager)
export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    
    const body = await request.json();
    const { weeklyPlan, publishedBy } = body;
    
    console.log(' POST Weekly Plan - Creating new plan');

    if (!weeklyPlan) {
      return NextResponse.json({ 
        success: false,
        error: 'Weekly plan data required' 
      }, { status: 400 });
    }

    // Deaktiviere vorherige Wochenpläne
    await WorkSchedule.updateMany(
      { isWeeklyPlan: true, planPublished: true },
      { planPublished: false }
    );

    // Erstelle neuen Wochenplan
    const newWeeklyPlan = await WorkSchedule.create({
      userId: publishedBy?.userId || "manager-user-id",
      date: new Date(),
      plannedStart: '07:00',
      plannedEnd: '16:00', 
      plannedHours: 8.25,
      weeklyPlan: weeklyPlan,
      isWeeklyPlan: true,
      planPublished: true,
      publishedBy: publishedBy || {
        userId: "manager-user-id",
        name: "Manager",
        email: "manager@company.com"
      },
      publishedAt: new Date()
    });

    console.log(' New weekly plan created:', newWeeklyPlan._id);

    return NextResponse.json({ 
      success: true, 
      weeklyPlan: newWeeklyPlan,
      message: 'Wochenplan erfolgreich veröffentlicht' 
    });
    
  } catch (error: any) {
    console.error(' Weekly plan creation error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}
