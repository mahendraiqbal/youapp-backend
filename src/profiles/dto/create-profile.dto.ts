export class CreateProfileDto {
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
