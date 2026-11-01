import express from 'express';
import morgan from 'morgan';

import { errorHandler } from '../middlewares/error.middleware.js';


const app = express();

app.use(morgan('dev'));
app.use(express.json());




app.get("/_status/healthz", (req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

app.get("/_status/readyz", (req, res) => {
    res.status(200).json({
        status: "ok",
    });
});


app.use(errorHandler);

export default app;