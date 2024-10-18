import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; 
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', 
      signOptions: { expiresIn: '60m' }, // Konfigurasi token
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], 
})
export class AuthModule {}
