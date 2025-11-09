import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'manager' | 'admin';
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): any;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'manager', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Einfache comparePassword Methode für Entwicklung
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return this.password === candidatePassword;
};

// User ohne Passwort zurückgeben
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
