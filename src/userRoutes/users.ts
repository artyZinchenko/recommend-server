import express from 'express';
import createAccount from './createAccount';
import login from './login';

const route = express.Router();

route.use(createAccount);
route.use(login);

export default route;
