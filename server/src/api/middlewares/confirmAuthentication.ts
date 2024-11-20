import config from '@/config';
import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import Logger from '@/loaders/logger';
import {ErrorHandler} from "@/api/middlewares/errorHandler";

interface JwtPayload extends jwt.JwtPayload {
    id: string;
}

export const getAccessTokenFromHeader = (req: Request): string | null => {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1]; // Extract the token after 'Bearer'
    }
    return null;
};

export const getRefreshTokenFromCookie = (req: Request): string | null => {
    return req.cookies['refreshToken'] || null;
};

const catchError = (err: any, res: Response) => {
    if (err instanceof TokenExpiredError) {
        err.message = 'JWT Expired';
    } else {
        err.message = 'Unauthorized Access';
    }
};

const confirmAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        Logger.debug('Verifying Access Token');

        // Get access token from Authorization header
        const accessToken = getAccessTokenFromHeader(req);
        if (!accessToken) {
            Logger.debug('Unauthorized:  Access Token Missing');
            throw new Error('Unauthorized ');
        }

        // Attempt refresh token validation
        const refreshToken = getRefreshTokenFromCookie(req);
        if (!refreshToken) {
            Logger.debug('Unauthorized:  Refresh Token Missing');
            throw new Error('Unauthorized ');
        }

        // Verify the access token
        const decoded: JwtPayload = jwt.verify(
            accessToken,
            config.accessTokenSecret as string
        ) as JwtPayload;

        return next();
    } catch (error) {
        const errorObject = error as ErrorHandler
        catchError(errorObject, res)
        return next({
            message: errorObject.message,
            status: 401
        })

    }
};

export default confirmAuthentication;
