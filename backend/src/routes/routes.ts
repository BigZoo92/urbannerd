import express from 'express';
import { signup, login, confirmSignup, logout } from './auth';
import { getUserInfo } from './user';

import { AuthSchemaType } from '../types';
import { createPost } from './post/createPost';
import { checkAuthenticated } from '../middlewares';

import { getAllPosts } from './post/getAllPosts';
import { isAuth } from './auth/isAuth';
import { upload } from '../constant';

declare global {
  namespace Express {
    interface Session {
      _user?: AuthSchemaType | null;
    }
  }
}

const router = express.Router();

// SIGNUP ROUTE
router.post('/auth/signup', (req, res) => signup(req, res));
router.get('/auth/confirmSignup', (req, res) => confirmSignup(req, res));

// LOGOUT ROUTE
router.get('/auth/logout', (req, res) => logout(req, res));

// LOGIN ROUTE
router.post('/checkAuthenticated', (req, res) => isAuth(req, res));

// LOGIN ROUTE
router.post('/auth/login', (req, res) => login(req, res));

//GET USER INFO
router.get('/info/user', (req, res) => getUserInfo(req, res));

//POST ROUTE
router.post('/post', checkAuthenticated, upload,  (req, res) => createPost(req, res));
//POST ROUTE
router.post('/getAllPosts', checkAuthenticated,  (req, res) => getAllPosts(req, res));

export default router;
