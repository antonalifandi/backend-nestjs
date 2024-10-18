// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; // Pastikan jalur ini benar
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // Pastikan Anda mengimpor UserModule di sini
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Ganti dengan kunci yang lebih aman di production
      signOptions: { expiresIn: '60m' }, // Konfigurasi token
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Ekspor AuthService jika diperlukan di modul lain
})
export class AuthModule {}
