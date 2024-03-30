import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsNotEmpty, IsString } from 'class-validator';

export interface UserJwtPayload {
  id: number;
  email: string;
}

export class RegistrationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}

export class LoginUserRequestDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  password: string;
}
