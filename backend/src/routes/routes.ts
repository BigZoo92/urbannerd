import express from 'express';
import { signup, login, confirmSignup, logout } from './auth';
import { getUserInfo } from './user';

import { AuthSchemaType } from '../types';
import { createPost } from './post/createPost';
import { checkAuthenticated } from '../middlewares';

import { getAllPosts } from './post/getAllPosts';
import { isAuth } from './auth/isAuth';
import { upload } from '../constant';
import { editUserInfo } from './user/editUserInfo';
import { getUserInfoWithId } from './user/getUserInfoWithId';
import { likePost } from './post';
import { isPostLikedByUser } from './post/isPostLikedByUser ';
import { toggleBookmark } from './post/toggleBookmark ';
import { isPostBookmarkedByUser } from './post/isPostBookmarkedByUser ';
import { getBookmark } from './user/getBookmark';
import { getPostLikesCount } from './post/getPostLikesCount';
import { getUserLikedPosts } from './post/getUserLikedPosts';
import { getUserPosts } from './post/getUserPosts';
import { createProduct } from './product/createProduct';
import { getAllProduct } from './product/getAllProduct';
import { getProductWithId } from './product/getProductWithId';
import { payment } from './payment';

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

//GET ALL POST
router.post('/getAllPosts', checkAuthenticated,  (req, res) => getAllPosts(req, res));

//GET ALL PRODUCT
router.post('/getAllProduct', checkAuthenticated,  (req, res) => getAllProduct(req, res));

//EDIT USER INFO
router.post('/editProfil', checkAuthenticated, upload,  (req, res) => editUserInfo(req, res));

//GET USER INFO WITH HIS ID
router.get('/getUserInfoWithId/:userId',  (req, res) => getUserInfoWithId(req, res));

//GET PRODUCT WITH ID
router.get('/getProductWithId/:productId',  (req, res) => getProductWithId(req, res));

//LIKE
router.post('/like',  (req, res) => likePost(req, res));

//GET LIKE
router.get('/isPostLikedByUser/:postId', checkAuthenticated, (req, res) => isPostLikedByUser(req, res));

//BOOKMARK
router.post('/toggleBookmark', checkAuthenticated, toggleBookmark);

//GET BOOKMARK STAT
router.get('/isPostBookmarkedByUser/:postId', checkAuthenticated, isPostBookmarkedByUser);

//GET BOOKMARK
router.get('/bookmark', checkAuthenticated, getBookmark);

// GET LIKE COUNT
router.get('/post/:postId/likes/count', (req, res) => getPostLikesCount(req, res));

// GET LIKED POST BY A USER
router.get('/user/:userId/likedPosts', (req, res) => getUserLikedPosts(req, res));

// GET POST BY A USER
router.get('/user/:userId/posts', (req, res) => getUserPosts(req, res));

// CREAT PRODUCT
router.post('/product/create', checkAuthenticated, upload, (req, res) => createProduct(req, res));

// PAY
router.post('/paiement', checkAuthenticated, (req, res) => payment(req, res));


export default router;
