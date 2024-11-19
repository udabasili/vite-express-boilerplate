import {Router} from "express";

export default (app: Router) =>{
    const route = Router();

    app.use('/channel', route);

    /**
     * Types of channels:
     * Text channel
     * Voice channel
     * Drawing channel
     * Code channel
     */
}