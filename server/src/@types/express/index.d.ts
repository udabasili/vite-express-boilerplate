import { Request } from "express"
import IUser from "@/interface/IUser"

declare global {
    namespace Express {
      export interface Request {
        currentUser: IUser
        userId: string
      }    
    }
}