import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly email: string;
  readonly username: string;
  password: string;
}
