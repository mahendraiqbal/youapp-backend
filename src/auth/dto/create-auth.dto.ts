import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  password: string;
}
