import express from 'express';
import { Server } from 'socket.io';

const route = express.Router();

export const attach = (io: Server) => {
    route.use((req, _res, next) => {
        try {
            req.io = io;
            next();
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            next();
        }
    });

    return route;
};
