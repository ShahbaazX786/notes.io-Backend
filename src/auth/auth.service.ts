import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>) { };

    /**
     * creates a new user
     */
    async createUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    /**
     * Fetches a single user and logs in.
     */
    async fetchUser(userReq: User): Promise<User> {
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
    async fetchAllUsers(): Promise<any> {
        let response = {};
        try {
            const userList = await this.userModel.find({});
            if (userList) {
                response = {
                    users: userList,
                    size: userList.length,
                    status: 'passed'
                }
            }
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async updateUser(id, data): Promise<void> {
        return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteUser(id): Promise<void> {
        return await this.userModel.findByIdAndDelete(id, { new: true });
    }
}
