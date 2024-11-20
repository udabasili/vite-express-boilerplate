import auth from './routes/auth';
import {Router} from "express";
import user from "@/api/routes/user";

export default () => {
    const app = Router();
    auth(app);
    user(app);
    return app;
}