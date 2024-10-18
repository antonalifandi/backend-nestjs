import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service'; 
import { JwtPayload } from './jwt-payload.interface'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', 
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; 
  }
}
