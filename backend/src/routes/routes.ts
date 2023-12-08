import express from 'express';
import { signup, login, confirmSignup, logout } from './auth';
import { getUserInfo } from './user';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import { AuthSchemaType } from '../types';
import { createPost } from './post/createPost';
import { checkAuthenticated } from '../middlewares';

declare global {
  namespace Express {
    interface Session {
      _user?: AuthSchemaType | null;
    }
  }
}

const router = express.Router();

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: 'http://localhost:4000/auth/google/callback', // L'URL de redirection
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
      console.log('done', done);
    },
  ),
);

// SIGNUP ROUTE
router.post('/auth/signup', (req, res) => signup(req, res));
router.get('/auth/confirmSignup', (req, res) => confirmSignup(req, res));

// LOGOUT ROUTE
router.get('/auth/logout', (req, res) => logout(req, res));

// GOOGLE ROUTE
// Route pour démarrer l'authentification Google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'], // Les autorisations requises
  }),
);

// Route de redirection après l'authentification Google
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Gestion de la redirection après une authentification réussie
    res.redirect('/dashboard'); // Redirigez l'utilisateur vers le tableau de bord
  },
);

// LOGIN ROUTE
router.post('/checkAuthenticated', (req, res) => checkAuthenticated(req, res));


// LOGIN ROUTE
router.post('/auth/login', (req, res) => login(req, res));

//GET USER INFO
router.get('/info/user', (req, res) => getUserInfo(req, res));

//POST ROUTE
router.post('/post', (req, res) => createPost(req, res));

export default router;
