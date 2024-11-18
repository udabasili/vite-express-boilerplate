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

//only for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
    }
    );
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});