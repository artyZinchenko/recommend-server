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
import adminRoutes from './adminRoutes/admin';
import { Server } from 'socket.io';
import { attach } from './middleware/attach';
import admin, { ServiceAccount } from 'firebase-admin';
import credentials from '../credentials.json';

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
        origin: 'https://recommend-client.web.app',
        methods: ['GET', 'POST'],
    },
});

admin.initializeApp({
    credential: admin.credential.cert(credentials as ServiceAccount),
});

io.on('connection', (socket) => {
    console.log('connect');

    socket.on('joinReview', (reviewId) => {
        socket.join(reviewId);
        app.set('socket', socket);
    });
    socket.on('leaveReview', (reviewId) => {
        socket.leave(reviewId);
        app.set('socket', socket);
    });
    socket.on('disconnect', function () {
        app.set('socket', null);
    });
});

app.use(attach(io));
app.use(getUser);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

app.use(exceptions.unknownEndpoint);
app.use(exceptions.errorHandling);

server.listen(config.PORT, () => {
    console.log(`Server listening at http://localhost:${config.PORT}`);
});
