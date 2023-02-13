process.env.NODE_CONFIG_DIR = './src/config';
require('dotenv').config();
import config from 'config';
import express, { Response } from 'express';
import { Routes } from './routes/routes';
import { AppDataSource } from './utils/data-source';
import validateEnv from './utils/validateEnv';

AppDataSource.initialize()
    .then(async () => {
        // VALIDATE ENV
        validateEnv();

        // create express app
        const app = express();
        app.use(express.json());

        // MIDDLEWARE

        // 1. Body parser

        // 2. Logger

        // 3. Cookie Parser

        // 4. Cors

        // ROUTES
        Routes.forEach((route) => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = new (route.controller as any)()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        // HEALTH CHECKER
        app.get('/api/healthchecker', async (_, res: Response) => {
            const message = 'Hello Welcome to Express with TypeORM';
            res.status(200).json({
                status: 'success',
                message
            });
        });

        // UNHANDLED ROUTE

        // GLOBAL ERROR HANDLER

        const port = config.get<number>('port');
        app.listen(port);

        console.log(`Server started on port: ${port}`);
    })
    .catch((error) => console.log(error));
