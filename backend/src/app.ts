import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes';
import { corsOptions, port, secret } from './constant';
import { AuthSchemaType } from './types';

declare module 'express-session' {
  interface Session {
    user: AuthSchemaType | null;
  }
}

// INIT
dotenv.config();
const app = express();
app.use(express.json());

// SESSION
app.use(cookieParser(secret));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path    : '/',
      secure: false, // true en production, false en développement
      maxAge: 24 * 60 * 60 * 1000, // Durée de vie du cookie en millisecondes
      httpOnly: true,
    },
  }),
);

// MIDDLEWARE
app.use(helmet());
app.use(cors(corsOptions));



// BACKEND'S HOME
app.get('/', (_, res) => {
  res.send('Hello, World!');
});

// ROUTES
app.use('/api', router);

// START THE SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
