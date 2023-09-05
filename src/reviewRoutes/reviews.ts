import express from 'express';
import createReview from './createReview';
import getTags from './getTags';
import getUserReviews from './getUserReviews';
import updateReview from './updateReview';
import getAllReviews from './getAllReviews';
import deleteReview from './deleteReview';

const route = express.Router();

route.use(getTags);
route.use(createReview);
route.use(getUserReviews);
route.use(updateReview);
route.use(getAllReviews);
route.use(deleteReview);

export default route;
