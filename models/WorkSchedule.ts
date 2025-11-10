import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IDayPlan {
  start: string;
  end: string;
  pause: number;
  hours: number;
  enabled: boolean;
}

export interface IWeeklyPlanData {
  monday: IDayPlan;
  tuesday: IDayPlan;
  wednesday: IDayPlan;
  thursday: IDayPlan;
  friday: IDayPlan;
  saturday: IDayPlan;
  sunday: IDayPlan;
}

export interface IPublishedBy {
  userId: string;
  name: string;
  email: string;
}

export interface IWorkSchedule extends Document {
  userId: string;
  date: Date;
  plannedStart: string;
  plannedEnd: string;
  plannedHours: number;
  weeklyPlan: IWeeklyPlanData;
  isWeeklyPlan: boolean;
  planPublished: boolean;
  publishedBy: IPublishedBy;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const dayPlanSchema = new Schema<IDayPlan>({
  start: { type: String, required: true, default: '08:00' },
  end: { type: String, required: true, default: '17:00' },
  pause: { type: Number, required: true, default: 45 },
  hours: { type: Number, required: true, default: 8.25 },
  enabled: { type: Boolean, required: true, default: true }
});

const weeklyPlanSchema = new Schema<IWeeklyPlanData>({
  monday: { type: dayPlanSchema, required: true },
  tuesday: { type: dayPlanSchema, required: true },
  wednesday: { type: dayPlanSchema, required: true },
  thursday: { type: dayPlanSchema, required: true },
  friday: { type: dayPlanSchema, required: true },
  saturday: { type: dayPlanSchema, required: true },
  sunday: { type: dayPlanSchema, required: true }
});

const publishedBySchema = new Schema<IPublishedBy>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const workScheduleSchema: Schema<IWorkSchedule> = new Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  plannedStart: {
    type: String,
    required: true,
    default: '08:00'
  },
  plannedEnd: {
    type: String,
    required: true,
    default: '17:00'
  },
  plannedHours: {
    type: Number,
    required: true,
    default: 8.25
  },
  weeklyPlan: {
    type: weeklyPlanSchema,
    required: true
  },
  isWeeklyPlan: {
    type: Boolean,
    default: false
  },
  planPublished: {
    type: Boolean,
    default: false
  },
  publishedBy: {
    type: publishedBySchema,
    required: false
  },
  publishedAt: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

// Index für schnelle Abfragen
workScheduleSchema.index({ isWeeklyPlan: 1, planPublished: 1 });
workScheduleSchema.index({ publishedAt: -1 });

export const WorkSchedule: Model<IWorkSchedule> = mongoose.models.WorkSchedule || mongoose.model<IWorkSchedule>('WorkSchedule', workScheduleSchema);
