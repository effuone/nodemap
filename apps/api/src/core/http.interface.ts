import { User } from '@prisma/client';
import { Response } from 'express';

export interface RequestWithUser {
  user?: User;
  res?: Response;
}
