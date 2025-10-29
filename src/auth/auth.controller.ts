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

  // This should be up if you want to have it working.
  @Delete('delete/all')
  async DeleteAllUsers() {
    return this.authService.deleteAllUsers();
  }

  // This should be below. (and nestjs uses fullmatch so even if id has 'all' substring in it it will not trigger above endpoint unless it matches fully.)
  @Delete('delete/:id')
  async DeleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
