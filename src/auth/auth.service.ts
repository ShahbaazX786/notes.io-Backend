import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { };

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
    async fetchAllUsers(): Promise<void> {
        let result;
        try {
            const userList = await this.userModel.find({});
            if (userList) {
                result = userList;
            }
        } catch (error) {
            console.log(error);
        }
        return result;
    }

    async updateUser(id, data): Promise<void> {
        return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    }
}
