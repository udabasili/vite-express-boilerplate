import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';

const app = express();
import router from './routes';

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});