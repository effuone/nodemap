import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.databaseService.user.create({ data });
  }

  async getAllUsers(): Promise<User[]> {
    return this.databaseService.user.findMany({});
  }

  async getUserById(id: number): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    return this.databaseService.user.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.databaseService.user.delete({ where: { id } });
  }
}
