import { Router } from 'express'
import { celebrate, errors, Joi, Segments } from 'celebrate'
import { AuthService } from '@/services/auth'
import { IUserInputDTO } from '@/interface/IUser'
import Logger from '@/loaders/logger'

export default (app: Router) => {
  const router = Router()
  app.use('/auth', router)

  /**
   * Types of authentication:
   * Register
   * Login
   * Logout
   */

  router.post(
    '/register',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().valid('user', 'admin').default('user')
      })
    }),
    async (req, res, next) => {
      try {
        const authServiceInstance = new AuthService()
        Logger.debug('Calling Register endpoint with body: %o', req.body)
        const { user, token } = await authServiceInstance.register(req.body as IUserInputDTO)
        res.cookie('refreshToken', token.refreshToken, { httpOnly: true, secure: true })
        res.json({ user, accessToken: token.accessToken })
      } catch (e) {
        const error = e as Error
        Logger.error('🔥 error: %o', error.message)
        return next(error)
      }
    }
  )

  router.post(
    '/login',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
    }),
    async (req, res, next) => {
      try {
        const authServiceInstance = new AuthService()
        Logger.debug('Calling Login endpoint with body: %o', req.body)
        const { user, token } = await authServiceInstance.login(req.body)
        res.cookie('x-token-refresh', token.refreshToken, { httpOnly: true, secure: true })
        res.json({ user, accessToken: token.accessToken })
      } catch (e) {
        const error = e as Error
        Logger.error('🔥 error: %o', error.message)
        return next(error)
      }
    }
  )
  app.use(errors())
}
