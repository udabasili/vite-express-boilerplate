import Logger from "@/loaders/logger";
import {Router} from "express";
import {TokenService} from "@/services/token";


const route = Router()
export default (app: Router) => {
    app.use('/token', route)

    route.get('/refresh',
        async (req, res, next) => {
            try {
                Logger.debug('Calling refresh token endpoint with body: %o', req.body );
                const today = new Date()
                let refreshToken = req.cookies['x-token-refresh'] || ''
                const accessToken = await TokenService.reIssueAccessToken(refreshToken)
                today.setHours(today.getHours() + 1);
                res.cookie("x-token", accessToken, {
                    expires: today, // 1 hour
                    secure: process.env.NODE_ENV === "production", // set to true if your using https
                    httpOnly: true,
                });
                res.status(200).json({});
            } catch (error) {
                next(error)
            }
        }
    )
}