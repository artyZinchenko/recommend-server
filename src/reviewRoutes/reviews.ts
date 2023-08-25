import express from 'express';
import createReview from './createReview';

const route = express.Router();

route.use(createReview);

export default route;
