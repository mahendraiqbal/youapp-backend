import { Document } from 'mongoose';

export interface Profile extends Document {
  about: {
    name: string;
    gender: string;
    birthday: string;
    horoscope: string;
    zodiac: string;
    height: string;
    weight: string;
  };
  interest: string;
}
