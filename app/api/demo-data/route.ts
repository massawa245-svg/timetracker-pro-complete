import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '@/models/User';
import { TimerSession } from '@/models/TimerSession';
import { WorkSchedule } from '@/models/WorkSchedule';

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

//  POST - Demo-Daten erstellen
export async function POST(): Promise<NextResponse> {
  try {
    await connectDB();
    
    console.log(' Creating demo data...');

    // Lösche vorhandene Demo-Daten
    await User.deleteMany({ email: { $regex: /demo/, $options: 'i' } });
    await TimerSession.deleteMany({});
    await WorkSchedule.deleteMany({ isWeeklyPlan: true });

    // Erstelle Demo-Benutzer
    const demoUsers = [
      {
        name: 'Max Mustermann',
        email: 'max.mustermann@demo.com',
        password: 'demo123',
        role: 'manager' as const,
        department: 'IT',
        position: 'Teamleiter'
      },
      {
        name: 'Anna Schmidt',
        email: 'anna.schmidt@demo.com',
        password: 'demo123',
        role: 'user' as const,
        department: 'Entwicklung',
        position: 'Senior Developer'
      },
      {
        name: 'Tom Weber',
        email: 'tom.weber@demo.com',
        password: 'demo123',
        role: 'user' as const,
        department: 'Design',
        position: 'UI/UX Designer'
      },
      {
        name: 'Lisa Fischer',
        email: 'lisa.fischer@demo.com',
        password: 'demo123',
        role: 'user' as const,
        department: 'Entwicklung',
        position: 'Frontend Developer'
      }
    ];

    const createdUsers = await User.insertMany(demoUsers);
    console.log(` Created ${createdUsers.length} demo users`);

    // Erstelle Demo Timer-Sessions
    const demoProjects = ['Website Redesign', 'Mobile App', 'API Entwicklung', 'Bug Fixing', 'Kundenmeeting'];
    const demoDescriptions = [
      'Frontend Komponenten entwickeln',
      'Backend API implementieren',
      'Design Review durchführen',
      'Performance optimieren',
      'Code Review'
    ];

    const demoTimeEntries = [];
    const now = new Date();

    for (const user of createdUsers.slice(1)) { // Alle außer Manager
      for (let i = 0; i < 10; i++) {
        const startTime = new Date(now);
        startTime.setDate(startTime.getDate() - Math.floor(Math.random() * 7));
        startTime.setHours(8 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60));

        const duration = (7 + Math.random() * 3) * 3600; // 7-10 Stunden in Sekunden
        const endTime = new Date(startTime.getTime() + duration * 1000);

        demoTimeEntries.push({
          userId: user._id,
          project: demoProjects[Math.floor(Math.random() * demoProjects.length)],
          description: demoDescriptions[Math.floor(Math.random() * demoDescriptions.length)],
          startTime,
          endTime,
          duration,
          status: 'completed' as const
        });
      }
    }

    await TimerSession.insertMany(demoTimeEntries);
    console.log(` Created ${demoTimeEntries.length} demo time entries`);

    // Erstelle Demo Wochenplan
    const demoWeeklyPlan = {
      monday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
      tuesday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
      wednesday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
      thursday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
      friday: { start: '08:00', end: '16:00', pause: 30, hours: 7.5, enabled: true },
      saturday: { start: '00:00', end: '00:00', pause: 0, hours: 0, enabled: false },
      sunday: { start: '00:00', end: '00:00', pause: 0, hours: 0, enabled: false }
    };

    const weeklyPlan = await WorkSchedule.create({
      userId: createdUsers[0]._id, // Manager
      date: new Date(),
      plannedStart: '08:00',
      plannedEnd: '17:00',
      plannedHours: 8.25,
      weeklyPlan: demoWeeklyPlan,
      isWeeklyPlan: true,
      planPublished: true,
      publishedBy: {
        userId: createdUsers[0]._id.toString(),
        name: createdUsers[0].name,
        email: createdUsers[0].email
      },
      publishedAt: new Date()
    });

    console.log(' Created demo weekly plan');

    return NextResponse.json({
      success: true,
      message: 'Demo-Daten erfolgreich erstellt',
      stats: {
        users: createdUsers.length,
        timeEntries: demoTimeEntries.length,
        weeklyPlan: weeklyPlan._id
      },
      demoUsers: createdUsers.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: 'demo123' // Nur für Demo-Zwecke
      }))
    });
    
  } catch (error: any) {
    console.error(' Demo data creation error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}
