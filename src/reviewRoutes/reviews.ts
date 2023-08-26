import express from 'express';
import createReview from './createReview';
import getTags from './getTags';

const route = express.Router();

route.use(getTags);
route.use(createReview);

export default route;
