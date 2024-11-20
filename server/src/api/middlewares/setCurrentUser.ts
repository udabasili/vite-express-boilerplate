import { IError } from "@/interface/IError";
import Logger from "@/loaders/logger";
import { Request, Response, NextFunction } from "express";
import User from "@/model/user";

const setCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRecord = await User.findById(req.params.userId);
    if (!userRecord) {
      throw new Error('No User found')
    }
    const currentUser = userRecord.toJSON()
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'email');
    Logger.debug('Setting current user')

    req.currentUser = currentUser;
    return next();
  } catch (e) {
    const errorObject = e as IError
    Logger.error('🔥 Error', errorObject);
    return next({
      message: 'UnAuthorized',
      status: 401
    })
  }

}

export default setCurrentUser