import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { VisiMisiModule } from './visi-misi/visi-misi.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, VisiMisiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
