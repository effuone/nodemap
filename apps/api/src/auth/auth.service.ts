import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { User } from '@prisma/client';
import {
  LoginUserRequestDto,
  RegistrationRequestDto,
  UserJwtPayload,
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly db: DatabaseService,
  ) {}

  public async validateUser(loginDto: LoginUserRequestDto) {
    const user = await this.db.user.findFirst({
      where: { email: loginDto.email },
    });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        loginDto.password,
        user.passwordHash,
      );
      if (isPasswordCorrect) {
        return user;
      }
    } else {
      throw new NotFoundException('Неверный пароль.');
    }
  }

  public async registerUser(registerDto: RegistrationRequestDto) {
    // @TODO: wrap this thing in transaction
    const userCheck = await this.db.user.findFirst({
      where: { email: registerDto.email },
    });
    if (userCheck) {
      throw new ConflictException(
        `User with email: ${registerDto.email} already exists`,
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    const user = await this.db.user.create({
      data: {
        email: registerDto.email,
        passwordHash,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      },
    });

    return user;
  }

  public async logoutUser(user: User, res: Response) {
    await this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentHashedRefreshToken: null,
      },
    });
    res.clearCookie('Refresh');
    res.clearCookie('Authorization');
  }

  public generateAccessToken(user: User) {
    const payload: UserJwtPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_IN_DAYS} days`,
    });
  }

  public generateRefreshToken(user: User) {
    const payload: UserJwtPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_IN_DAYS} days`,
    });
  }

  public setTokenCookies(
    res: Response,
    {
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    },
  ) {
    res.cookie('Refresh', refreshToken, {
      maxAge:
        (process.env.JWT_REFRESH_TOKEN_EXPIRATION_IN_DAYS as any) *
        1000 *
        60 *
        60 *
        24,
    });
    res.cookie('Authorization', accessToken, {
      maxAge:
        (process.env.JWT_ACCESS_TOKEN_EXPIRATION_IN_DAYS as any) *
        1000 *
        60 *
        60 *
        24,
    });
  }

  public setAccessTokenCookie(res: Response, accessToken: string) {
    res.cookie('Authorization', accessToken, {
      maxAge:
        (process.env.JWT_ACCESS_TOKEN_EXPIRATION_IN_DAYS as any) * 60 * 60 * 24,
    });
  }

  public async saveRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    return await this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentHashedRefreshToken,
      },
    });
  }
}
