import {Router} from "express";

export default (app: Router) =>{
    const router = Router();
    app.use('/auth', router);

    /**
     * Types of authentication:
     * Register
     * Login
     * Logout
     */
}