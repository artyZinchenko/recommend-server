import express from 'express';
import addLike from './addLike';
import addRating from './addRating';

const route = express.Router();

route.use(addLike);
route.use(addRating);

export default route;
