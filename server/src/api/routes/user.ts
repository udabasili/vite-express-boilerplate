import {Router} from "express";

export default (app: Router) =>{
    const route = Router();

    app.use('/user', route);


}