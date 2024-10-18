// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Pastikan ini ada untuk mengekspor UserService
})
export class UserModule {}
