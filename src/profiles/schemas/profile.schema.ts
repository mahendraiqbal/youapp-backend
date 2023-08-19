import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema({
  about: {
    name: String,
    gender: String,
    birthday: String,
    horoscope: String,
    zodiac: String,
    height: String,
    weight: String,
  },
  interest: String,
});
