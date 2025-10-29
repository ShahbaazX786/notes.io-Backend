import { UpdateUserDto } from './../dto/auth/update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/auth/create-user.dto';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
import { AuthService } from './auth.service';

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
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  async DeleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Delete('delete/all')
  async DeleteAllUsers() {
    return this.authService.deleteAllUsers();
  }
}
