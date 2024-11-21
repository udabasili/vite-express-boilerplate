import expressLoader from './express'
import Logger from './logger'
//We have to import at least all the events once so they can be triggered
import { Application } from 'express'
import connectDB from '@/loaders/mongoose'

export default async ({ expressApp }: { expressApp: Application }) => {
  //wait for db then load express
  await connectDB()
  Logger.info('DB loaded and connected!')
  await expressLoader({ app: expressApp })
  Logger.info('Express loaded')
}
