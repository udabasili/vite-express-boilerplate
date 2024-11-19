import {Router} from "express";

export default (app: Router) =>{
    const route = Router();

    app.use('/group', route);

    /**
     * Types of groups:
     * Java group
     * Python group
     * JavaScript group
     * C++ group
     * C# group
     * Design group
     *
     * Under each group we have channels
     * - Ask questions
     * - Share resources
     * - Project ideas
     * - Start coding project and allow others to code
     * - Design a project
     * - Frequently asked questions
     * - External resources (links)
     */
}