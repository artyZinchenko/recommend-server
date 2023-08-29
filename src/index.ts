import express from 'express';
import cors from 'cors';
import http from 'http';
import config from './utils/config';
import { PrismaClient } from '@prisma/client';
import userRoutes from './userRoutes/users';
import getUser from './middleware/getUser';
import reviewRoutes from './reviewRoutes/reviews';
import exceptions from './middleware/exceptions';
import commentRoutes from './commentRoutes/comment';

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use((req, _res, next) => {
    req.prisma = prisma;
    next();
});

app.use(getUser);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);

app.use(exceptions.unknownEndpoint);
app.use(exceptions.errorHandling);

server.listen(config.PORT, () => {
    console.log(`Chat-server listening at http://localhost:${config.PORT}`);
});
