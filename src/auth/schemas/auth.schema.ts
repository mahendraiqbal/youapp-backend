import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});
