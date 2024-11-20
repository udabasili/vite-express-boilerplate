import User, {UserModel} from "@/model/user";
import {ILoginDTO, IUser, IUserInputDTO} from "@/interface/IUser";
import {TokenService} from "@/services/token";
import Logger from "@/loaders/logger";

export class AuthService {
    private readonly tokenService: typeof TokenService;
    private readonly logger: typeof  Logger
    private readonly userModel: UserModel

     constructor() {
        this.userModel = User;
        this.logger = Logger;
        this.tokenService = TokenService;
    }

    /**
     * Register a user
     * @returns Promise
     * @param userInputDTO
     */
    public async register(userInputDTO: IUserInputDTO): Promise<{ user: IUser, token: {
        accessToken: string,
        refreshToken: string
        } }> {
        const userRecord = await  this.userModel.create(userInputDTO);
        this.logger.silly('Generating JWT');
        const accessToken = this.tokenService.generateAccessToken(userRecord.id);
        const refreshToken = await this.tokenService.generateRefreshToken(userRecord);
        if (!userRecord) {
            throw new Error('User cannot be created');
        }
        Logger.silly('User Created');
        const user = userRecord.toObject();
        Reflect.deleteProperty(user, 'password')
        return {
            user,
            token: {
                accessToken,
                refreshToken
            }
        }
    }

    /**
     * Login a user
     * @returns Promise
     * @param loginDTO
     */
    public async login(loginDTO: ILoginDTO) : Promise<{user: IUser, token: {accessToken: string,
            refreshToken: string}}>{
        const userRecord = await this.userModel.findOne({
            email: loginDTO.email
        })
        this.logger.silly("Finding User")
        if (!userRecord){
            throw new Error('User not found');
        }
        const passwordValidated: boolean = await userRecord.validatePassword(loginDTO.password)
        this.logger.silly("Validating Password")
        if(!passwordValidated) {
            throw new Error('Password is invalid');
        }
        this.logger.silly('Generating JWT');
        const accessToken = this.tokenService.generateAccessToken(userRecord.id);
        const refreshToken = await this.tokenService.generateRefreshToken(userRecord);
        const user = userRecord.toObject();
        Reflect.deleteProperty(user, 'password')
        return {
            user,
            token: {
                accessToken,
                refreshToken
            }
        }
    }
}

