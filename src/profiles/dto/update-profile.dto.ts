import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  about?: {
    name: string;
    gender: string;
    birthday: string;
    horoscope: string;
    zodiac: string;
    height: string;
    weight: string;
  };
  interest?: string;
}
