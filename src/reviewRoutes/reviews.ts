import express from 'express';
import createReview from './createReview';
import getTags from './getTags';
import getUserReviews from './getUserReviews';
import updateReview from './updateReview';

const route = express.Router();

route.use(getTags);
route.use(createReview);
route.use(getUserReviews);
route.use(updateReview);

export default route;
