import jwt, {JwtPayload} from 'jsonwebtoken';
import {IUser} from "@/interface/IUser";
import config from "@/config";
import {IError} from "@/interface/IError";
import {Token} from "@/model/token";
import Logger from "@/loaders/logger";

/** Generate access token and refresh token */


export class TokenService {
    /**
     * @description Generate access token
     * @param userId
     * @returns string
     */
      public static generateAccessToken = (userId: string) => {
        return jwt.sign({
            id: userId,
        }, config.accessTokenSecret, {expiresIn: config.accessTokenExpiration});
      }

    /**
     * @description Generate refresh token
     * @param user
     * @returns string
     */

    public static generateRefreshToken = async (user: IUser) => {
        const refreshToken =  jwt.sign({
            id: user.id,
        }, config.refreshTokenSecret, {expiresIn: config.refreshTokenExpiration});

        await Token.create({
            userId: user.id,
            refreshToken,
        });
        return refreshToken

    }


    /**
     * @description Re-issue access token
     * @param refreshToken
     * @returns string
     * @throws {IError}
     *
     * */
    public  static async  reIssueAccessToken  (refreshToken: string) {

        let customError: IError = {} as IError;

        try {
            const payload: JwtPayload = jwt.verify(refreshToken, config.refreshTokenSecret as string) as JwtPayload
            const u = {
                userId: payload.userId,
            }

            const refreshTokenFound =  await Token.find({
                where: {
                    refreshToken
                },
                limit: 1,
                order: [[
                    'createdAt',
                    'DESC'
                ]]
            })
            const newestRefreshToken = refreshTokenFound[0]?.toJSON().refreshToken
            const userId = refreshTokenFound[0]?.toJSON().userId
            console.log(userId)
            if (!newestRefreshToken) {
                customError.message = 'Unauthorized'
                customError.status = 401
                return
            }

            if (newestRefreshToken !== refreshToken) {
                customError.message = 'Unauthorized'
                customError.status = 401
                Logger.debug('Old token.Not valid anymore.')
            }
            return this.generateAccessToken(userId)

        } catch (error) {
            throw customError
        }
    }


}