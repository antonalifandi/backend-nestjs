import { Controller, Get, Post, Patch, Body, Param, UseGuards, ParseIntPipe, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { LoginDto } from 'src/dto/login.dto'; 


@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

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
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get master data users' })
    @ApiResponse({ status: 200, description: 'List of users.' })
    async getMasterData() {
        return this.userService.findAll();
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update user information' })
    @ApiResponse({ status: 200, description: 'User information updated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.editUser(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 200, description: 'User successfully deleted.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        const deletedUser = await this.userService.deleteUser(id);
        return {
            statusCode: 200,
            message: 'User successfully deleted.',
            data: deletedUser,
        };
    }
}
