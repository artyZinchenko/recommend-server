import express from 'express';
import cors from 'cors';
import http from 'http';
import config from './utils/config';
import { PrismaClient } from '@prisma/client';
import userRoutes from './userRoutes/users';
import getUser from './middleware/getUser';
import reviewRoutes from './reviewRoutes/reviews';
import feedbackRoutes from './feedbackRoute/feedback';
import exceptions from './middleware/exceptions';
import commentRoutes from './commentRoutes/comment';
import { Server } from 'socket.io';
import { attach } from './middleware/attach';

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use((req, _res, next) => {
    req.prisma = prisma;
    next();
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('connect');

    socket.on('joinReview', (reviewId) => {
        console.log('join review', socket.id);
        console.log(reviewId);
        socket.join(reviewId);
        app.set('socket', socket);
    });
    socket.on('leaveReview', (reviewId) => {
        console.log('leave review', reviewId);
        socket.leave(reviewId);
        app.set('socket', socket);
    });
    socket.on('disconnect', function () {
        console.log('Got disconnect!');
        app.set('socket', null);
    });
});

app.use(attach(io));
app.use(getUser);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use(exceptions.unknownEndpoint);
app.use(exceptions.errorHandling);

server.listen(config.PORT, () => {
    console.log(`Chat-server listening at http://localhost:${config.PORT}`);
});
