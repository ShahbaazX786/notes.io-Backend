import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schema/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() userDto: User) {
        return this.authService.createUser(userDto);
    }

    @Post('login')
    async login(@Body() userDto: User) {
        return this.authService.fetchUser(userDto);
    }

    @Get('all')
    async fetchUserList() {
        return this.authService.fetchAllUsers();
    }
}
