import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserService } from 'src/user/user.service'; 
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto'; 
import { LoginDto } from './dto/login.dto'; 

@ApiTags('users') 
@Controller('users') 
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' }) 
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto); 
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' }) 
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto); 
  }

  @Get('master-data')
  @ApiOperation({ summary: 'Get master data users' }) 
  @ApiResponse({ status: 200, description: 'List of users.' })
  async getMasterData() {
    return this.userService.findAll(); 
  }
}
