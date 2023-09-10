import express from 'express';
import createReview from './createReview';
import getTags from './getTags';
import getUserReviews from './getUserReviews';
import updateReview from './updateReview';
import getAllReviews from './getAllReviews';
import deleteReview from './deleteReview';
import getBestReviews from './getBestReviews';
import getLatestReviews from './getLatestReviews';
import getReviewsByTag from './getReviewsByTag';
import fulltextReview from './fulltextReview';

const route = express.Router();

route.use(getTags);
route.use(createReview);
route.use(getUserReviews);
route.use(updateReview);
route.use(getAllReviews);
route.use(deleteReview);
route.use(getBestReviews);
route.use(getLatestReviews);
route.use(getReviewsByTag);
route.use(fulltextReview);

export default route;
