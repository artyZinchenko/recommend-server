import express from 'express';
import cors from 'cors';
import http from 'http';
import config from './utils/config';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

console.log('hi');
server.listen(config.PORT, () => {
    console.log(`Chat-server listening at http://localhost:${config.PORT}`);
});
