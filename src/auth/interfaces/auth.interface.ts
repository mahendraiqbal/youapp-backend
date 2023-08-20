import { Document } from 'mongoose';

export interface Auth extends Document {
  email: string;
  username: string;
  password: string;
}
