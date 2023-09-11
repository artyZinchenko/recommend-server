import express from 'express';
import createAccount from './createAccount';
import login from './login';
import refresh from './refresh';
import signinFirebase from './signinFirebase';
import getUserLikes from './getUserLikes';

const route = express.Router();

route.use(createAccount);
route.use(login);
route.use(refresh);
route.use(signinFirebase);
route.use(getUserLikes);

export default route;
