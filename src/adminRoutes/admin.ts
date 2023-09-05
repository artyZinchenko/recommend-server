import express from 'express';
import getUsers from './getUsers';
import blockUser from './blockUser';
import grantAdmin from './grantAdmin';

const route = express.Router();

route.use(getUsers);
route.use(blockUser);
route.use(grantAdmin);

export default route;
