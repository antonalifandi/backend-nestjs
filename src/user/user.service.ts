import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { user } from '@prisma/client'; 

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { id }, 
    });
  }

  async findAll(): Promise<user[]> {
    return this.prisma.user.findMany(); 
  }

  async editUser(id: string, data: { email?: string; password?: string; name?: string; role?: string }) {
    const userId = id; 
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,  
      },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id: userId }, 
      data,
    });
  }

  async deleteUser(id: string): Promise<user> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
    return user; 
  }

}
