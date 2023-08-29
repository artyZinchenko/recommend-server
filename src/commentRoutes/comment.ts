import express from 'express';
import getComments from './getComments';
import addComment from './addComment';

const route = express.Router();

route.use(getComments);
route.use(addComment);

export default route;
