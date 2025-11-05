import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuthResponseDto } from 'src/dto/auth/auth-response.dto';
import { CreateUserDto } from 'src/dto/auth/create-user.dto';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
import { User } from 'src/schema/user.schema';
import * as crypto from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtservice: JwtService,
  ) {}

  /**
   * creates a new user
   */
  async createUser(user: CreateUserDto) {
    const isUserExists = await this.checkDuplicateEmail(user.email);
    if (isUserExists) {
      return { success: false, message: 'User Already Exists!' };
    }
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Fetches a single user and logs in.
   */
  async fetchUser(userReq: LoginUserDto) {
    const { email, password } = userReq;
    try {
      const user = await this.userModel.findOne({ email });
      if (!user)
        return {
          success: false,
          message: 'Invalid Email Address.',
        };

      const isPasswordMatch = await crypto.compare(password, user.password);
      if (!isPasswordMatch)
        return {
          success: false,
          message: 'Wrong Password',
        };

      const payload = { username: user.username, sub: user._id };
      const access_token = this.jwtservice.sign(payload);
      return {
        success: true,
        message: 'User Logged In Sucessfully',
        access_token,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `Something went wrong:${error.message}`,
      };
    }
  }

  /**
   * Fetches all users
   */
  async fetchAllUsers(): Promise<any | AuthResponseDto> {
    let response = {};
    try {
      const userList = await this.userModel.find({});
      if (userList) {
        response = {
          data: userList,
          size: userList.length,
          succes: true,
          message: 'All Users Fetched Sucessfully',
        };
      }
    } catch (error) {
      console.log(error);
    }
    return response;
  }

  async updateUser(id, data) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedUser) {
      return { success: false, message: 'User not found' };
    } else {
      return { success: true, message: 'User Updated Sucessfully!' };
    }
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return { success: false, message: 'User not found' };
    } else {
      return { success: true, message: 'User deleted sucessfully' };
    }
  }

  checkDuplicateEmail = async (email: string) => {
    try {
      const result = await this.userModel.findOne({ email });
      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteAllUsers = async () => {
    try {
      const result = await this.userModel.deleteMany({});
      if (result) {
        return { success: true, message: 'Cleared all users' };
      } else {
        return { success: false, message: 'Unable to clear all users' };
      }
    } catch (error) {
      console.log(error);
    }
  };
}
