import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return null;

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      statusCode: 200,
      message: 'Login successful',
      access_token: accessToken,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
