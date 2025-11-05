import { UpdateUserDto } from './../dto/auth/update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/auth/create-user.dto';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async fetchUserList() {
    return this.authService.fetchAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  // This should be up if you want to have it working.
  @UseGuards(JwtAuthGuard)
  @Delete('delete/all')
  async DeleteAllUsers() {
    return this.authService.deleteAllUsers();
  }

  // This should be below. (and nestjs uses fullmatch so even if id has 'all' substring in it it will not trigger above endpoint unless it matches fully.)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async DeleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
