import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'First Name is too short',
  })
  @MaxLength(15, {
    message: 'First Name is too long',
  })
  first_name: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'Last Name is too short',
  })
  @MaxLength(15, {
    message: 'First Name is too long',
  })
  last_name: string;
}

export class SigninDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
