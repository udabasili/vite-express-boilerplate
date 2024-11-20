import User, {UserModel} from "@/model/user";
import Logger from "@/loaders/logger";
import {IUser} from "@/interface/IUser";

export class UserService{
    private userModel: UserModel
    private logger: typeof Logger

    /**
     * Constructor
     */
    constructor() {
        this.userModel = User
        this.logger = Logger
    }

    /**
     * Get user by id
     * @param userId
     */
    public async getUser(userId: string): Promise<IUser>{
        const userRecord = await this.userModel.findById(userId)
        this.logger.silly("Getting user")
        if(!userRecord){
            throw new Error("No user found")
        }
        const user = userRecord.toObject()
        Reflect.deleteProperty(user, 'password')
        return user
    }
}