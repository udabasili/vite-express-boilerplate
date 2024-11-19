import { Router } from 'express';

const router = Router();



export default (app: Router) => {
    app.use('/customers', router);

    router.get('', (req, res) => {
        res.json({
            customers: [
                {
                    id: 1,
                    name: 'John Doe',
                    email: ''
                },
                {
                    id: 2,
                    name: 'Jane Doe',
                    email: ''
                },
            ]
        });
    })

}