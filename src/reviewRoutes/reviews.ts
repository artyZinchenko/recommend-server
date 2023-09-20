import express from 'express';
import createReview from './createReview';
import getTags from './getTags';
import getUserReviews from './getUserReviews';
import updateReview from './updateReview';
import getReviewById from './getReviewById';
import deleteReview from './deleteReview';
import getBestReviews from './getBestReviews';
import getLatestReviews from './getLatestReviews';
import getReviewsByTag from './getReviewsByTag';
import fulltextReview from './fulltextReview';
import getProducts from './getProducts';

const route = express.Router();

route.use(getTags);
route.use(createReview);
route.use(getUserReviews);
route.use(updateReview);
route.use(getReviewById);
route.use(deleteReview);
route.use(getBestReviews);
route.use(getLatestReviews);
route.use(getReviewsByTag);
route.use(fulltextReview);
route.use(getProducts);

export default route;
