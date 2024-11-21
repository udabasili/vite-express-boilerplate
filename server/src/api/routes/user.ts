import { Router } from 'express'
import confirmAuthentication from '../middlewares/confirmAuthentication'
import setCurrentUser from '@/api/middlewares/setCurrentUser'

export default (app: Router) => {
  const route = Router()

  app.use('/user/:userId', confirmAuthentication, setCurrentUser, route)
  route.get('', (req, res) => {
    res.status(200).json({ message: req.currentUser })
  })
}
