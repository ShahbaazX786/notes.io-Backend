import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from 'src/dto/auth/create-user.dto';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.fetchUser(loginUserDto);
  }

  @Get('users')
  async fetchUserList() {
    return this.authService.fetchAllUsers();
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() userDto: User) {
    return this.authService.updateUser(id, userDto);
  }

  @Delete('delete/:id')
  async DeleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
