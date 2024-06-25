import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
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

    @Put('update/:id')
    async updateUser(@Param('id') id: string, @Body() userDto: User) {
        return this.authService.updateUser(id, userDto);
    }
}
