import { IsString, IsEmail } from 'class-validator';

export class CreateTeacherDto {
  @IsString() name: string;
  @IsEmail()  email: string;
}
