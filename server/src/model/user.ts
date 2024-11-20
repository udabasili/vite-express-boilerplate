import {Model, model, Schema} from 'mongoose';
import {IUser, Role} from "@/interface/IUser";
import bcrypt from 'bcrypt';
import Logger from "@/loaders/logger";

interface IUserMethods {
    fullName(): string;
    validatePassword(password: string): Promise<boolean>;
}
export type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Role,
        required: true
    },

}, {
    timestamps: true
});
/**
 * Get the full name of the user
 */
userSchema.method('fullName', function fullName() {
    return this.firstName + ' ' + this.lastName;
});

/**
 * Validate the password
 */
userSchema.method('validatePassword', async function validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
});

/**
 * Hash the password using the pre-save hook
 */
userSchema.pre('save', async function save(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        Logger.silly('Hashing password');
        user.password = await bcrypt.hash(user.password, salt);
        return next();
    } catch (error) {
        const err = new Error(error as string);
        return next(err);
    }
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;