"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth");
const user_1 = require("./user");
const createPost_1 = require("./post/createPost");
const middlewares_1 = require("../middlewares");
const getAllPosts_1 = require("./post/getAllPosts");
const isAuth_1 = require("./auth/isAuth");
const constant_1 = require("../constant");
const editUserInfo_1 = require("./user/editUserInfo");
const getUserInfoWithId_1 = require("./user/getUserInfoWithId");
const post_1 = require("./post");
const isPostLikedByUser_1 = require("./post/isPostLikedByUser ");
const toggleBookmark_1 = require("./post/toggleBookmark ");
const isPostBookmarkedByUser_1 = require("./post/isPostBookmarkedByUser ");
const getBookmark_1 = require("./user/getBookmark");
const getPostLikesCount_1 = require("./post/getPostLikesCount");
const getUserLikedPosts_1 = require("./post/getUserLikedPosts");
const getUserPosts_1 = require("./post/getUserPosts");
const createProduct_1 = require("./product/createProduct");
const getAllProduct_1 = require("./product/getAllProduct");
const getProductWithId_1 = require("./product/getProductWithId");
const payment_1 = require("./payment");
const getFollowersCount_1 = require("./user/getFollowersCount");
const getFollowingsCount_1 = require("./user/getFollowingsCount");
const toggleFollow_1 = require("./user/toggleFollow");
const isUserFollowing_1 = require("./user/isUserFollowing");
const router = express_1.default.Router();
// SIGNUP ROUTE
router.post('/auth/signup', (req, res) => (0, auth_1.signup)(req, res));
router.get('/auth/confirmSignup', (req, res) => (0, auth_1.confirmSignup)(req, res));
// LOGOUT ROUTE
router.get('/auth/logout', (req, res) => (0, auth_1.logout)(req, res));
// LOGIN ROUTE
router.post('/checkAuthenticated', (req, res) => (0, isAuth_1.isAuth)(req, res));
// LOGIN ROUTE
router.post('/auth/login', (req, res) => (0, auth_1.login)(req, res));
//GET USER INFO
router.get('/info/user', (req, res) => (0, user_1.getUserInfo)(req, res));
//POST ROUTE
router.post('/post', middlewares_1.checkAuthenticated, constant_1.upload, (req, res) => (0, createPost_1.createPost)(req, res));
//GET ALL POST
router.post('/getAllPosts', middlewares_1.checkAuthenticated, (req, res) => (0, getAllPosts_1.getAllPosts)(req, res));
//GET ALL PRODUCT
router.post('/getAllProduct', middlewares_1.checkAuthenticated, (req, res) => (0, getAllProduct_1.getAllProduct)(req, res));
//EDIT USER INFO
router.post('/editProfil', middlewares_1.checkAuthenticated, constant_1.upload, (req, res) => (0, editUserInfo_1.editUserInfo)(req, res));
//GET USER INFO WITH HIS ID
router.get('/getUserInfoWithId/:userId', (req, res) => (0, getUserInfoWithId_1.getUserInfoWithId)(req, res));
//GET PRODUCT WITH ID
router.get('/getProductWithId/:productId', (req, res) => (0, getProductWithId_1.getProductWithId)(req, res));
//LIKE
router.post('/like', (req, res) => (0, post_1.likePost)(req, res));
//GET LIKE
router.get('/isPostLikedByUser/:postId', middlewares_1.checkAuthenticated, (req, res) => (0, isPostLikedByUser_1.isPostLikedByUser)(req, res));
//BOOKMARK
router.post('/toggleBookmark', middlewares_1.checkAuthenticated, toggleBookmark_1.toggleBookmark);
//GET BOOKMARK STAT
router.get('/isPostBookmarkedByUser/:postId', middlewares_1.checkAuthenticated, isPostBookmarkedByUser_1.isPostBookmarkedByUser);
//GET BOOKMARK
router.get('/bookmark', middlewares_1.checkAuthenticated, getBookmark_1.getBookmark);
// GET LIKE COUNT
router.get('/post/:postId/likes/count', (req, res) => (0, getPostLikesCount_1.getPostLikesCount)(req, res));
// GET LIKED POST BY A USER
router.get('/user/:userId/likedPosts', (req, res) => (0, getUserLikedPosts_1.getUserLikedPosts)(req, res));
// GET POST BY A USER
router.get('/user/:userId/posts', (req, res) => (0, getUserPosts_1.getUserPosts)(req, res));
// CREAT PRODUCT
router.post('/product/create', middlewares_1.checkAuthenticated, constant_1.upload, (req, res) => (0, createProduct_1.createProduct)(req, res));
// PAY
router.post('/paiement', middlewares_1.checkAuthenticated, (req, res) => (0, payment_1.payment)(req, res));
router.post('/user/toggleFollow', middlewares_1.checkAuthenticated, toggleFollow_1.toggleFollow);
router.get('/user/:userId/followers/count', getFollowersCount_1.getFollowersCount);
router.get('/user/:userId/followings/count', getFollowingsCount_1.getFollowingsCount);
router.get('/user/:followingId/isFollowing', isUserFollowing_1.isUserFollowing);
exports.default = router;
