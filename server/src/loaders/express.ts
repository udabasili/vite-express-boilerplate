import express, { Application, NextFunction } from 'express'
import cors from 'cors'
import routes from '@/api'
import config from '@/config'
import { isCelebrateError } from 'celebrate'
import cookieParser from 'cookie-parser'
import { ErrorHandler, ErrorHandlerProps } from '@/api/middlewares/errorHandler'
import { IError } from '@/interface/IError'

export default ({ app }: { app: Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */

  app.get('/status', (req, res) => {
    res.status(200).end()
  })

  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  app.use(express.json())

  app.use(cookieParser())

  app.use(express.urlencoded({ extended: true }))

  app.use(cors())

  app.use(config.api.prefix, routes())

  /// error handlers

  app.use((req, res, next) => {
    const error = new ErrorHandler('Not Found', 404)
    return next(error)
  })
  // @ts-expect-error
  app.use((err: ErrorHandlerProps, _, res: Response) => {
    if (isCelebrateError(err)) {
      const errorBody = err.details.get('body')?.message // 'details' is a Map()
      err.message = errorBody || ''
    }
    const error = new Error('Not Found') as IError
    error.status = res.status || 404
    // @ts-expect-error
    return res.json(error)
  })

  // @ts-expect-error
  app.use((_, res: Response, next: NextFunction) => {
    const error = new Error('Not Found') as IError
    error.status = res.status || 404
    next(error)
  })
}
