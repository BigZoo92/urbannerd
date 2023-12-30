import express from 'express';
import { signup, login, confirmSignup, isAuth } from './auth';
import { editUserInfo, getBookmark, getFollowersCount, getFollowingsCount, toggleFollow, isUserFollowing, getUserInfoWithId } from './user';

import { createPost, getAllPosts, likePost, isPostLikedByUser, toggleBookmark, isPostBookmarkedByUser, getPostLikesCount, getUserLikedPosts, getUserPosts } from './post';

import { upload } from '../constant';
import { createProduct, getProductWithId, getAllProduct } from './product';
import { payment } from './payment';

const router = express.Router();

// SIGNUP ROUTE
router.post('/auth/signup', (req, res) => signup(req, res));
router.get('/auth/confirmSignup', (req, res) => confirmSignup(req, res));


// LOGIN ROUTE
router.post('/checkAuthenticated', (req, res) => isAuth(req, res));

// LOGIN ROUTE
router.post('/auth/login', (req, res) => login(req, res));

//POST ROUTE
router.post('/post', upload,  (req, res) => createPost(req, res));

//GET ALL POST
router.post('/getAllPosts',  (req, res) => getAllPosts(req, res));

//GET ALL PRODUCT
router.post('/getAllProduct',  (req, res) => getAllProduct(req, res));

//EDIT USER INFO
router.post('/editProfil', upload,  (req, res) => editUserInfo(req, res));

//GET USER INFO WITH HIS ID
router.get('/getUserInfoWithId/:userId',  (req, res) => getUserInfoWithId(req, res));

//GET PRODUCT WITH ID
router.get('/getProductWithId/:productId',  (req, res) => getProductWithId(req, res));

//LIKE
router.post('/like',  (req, res) => likePost(req, res));

//GET LIKE
router.get('/isPostLikedByUser/:postId', (req, res) => isPostLikedByUser(req, res));

//BOOKMARK
router.post('/toggleBookmark', toggleBookmark);

//GET BOOKMARK STAT
router.get('/isPostBookmarkedByUser/:postId', isPostBookmarkedByUser);

//GET BOOKMARK
router.get('/bookmark', getBookmark);

// GET LIKE COUNT
router.get('/post/:postId/likes/count', (req, res) => getPostLikesCount(req, res));

// GET LIKED POST BY A USER
router.get('/user/:userId/likedPosts', (req, res) => getUserLikedPosts(req, res));

// GET POST BY A USER
router.get('/user/:userId/posts', (req, res) => getUserPosts(req, res));

// CREAT PRODUCT
router.post('/product/create', upload, (req, res) => createProduct(req, res));

// PAY
router.post('/paiement', (req, res) => payment(req, res));

router.post('/user/toggleFollow', toggleFollow);
router.get('/user/:userId/followers/count', getFollowersCount);
router.get('/user/:userId/followings/count', getFollowingsCount);
router.get('/user/:followingId/isFollowing', isUserFollowing);


export default router;
