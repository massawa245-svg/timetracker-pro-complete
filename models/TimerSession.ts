import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface ITimerSession extends Document {
  userId: Types.ObjectId;
  project: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  status: 'running' | 'paused' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const timerSessionSchema: Schema<ITimerSession> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  status: {
    type: String,
    enum: ['running', 'paused', 'completed'],
    default: 'running'
  }
}, {
  timestamps: true
});

export const TimerSession: Model<ITimerSession> = mongoose.models.TimerSession || mongoose.model<ITimerSession>('TimerSession', timerSessionSchema);
