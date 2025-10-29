import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateUserDto } from 'src/dto/auth/create-user.dto';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
import { authResponseDto } from 'src/dto/authResponseDto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  /**
   * creates a new user
   */
  async createUser(user: CreateUserDto) {
    const isUserExists = await this.checkDuplicateEmail(user.email);
    if (isUserExists) {
      return { success: false, message: 'User Already Exists!' };
    }
    console.log('are we here?');
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Fetches a single user and logs in.
   */
  async fetchUser(userReq: LoginUserDto) {
    let result;
    const email = userReq.email;
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        result = user;
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  /**
   * Fetches all users
   */
  async fetchAllUsers(): Promise<any | authResponseDto> {
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
}
