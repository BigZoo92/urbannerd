import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes';
import { corsOptions, port, secret } from './constant';
import { AuthSchemaType } from './types';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';


declare module 'express-session' {
  interface Session {
    user: AuthSchemaType | null;
  }
}

// INIT
dotenv.config();
const app = express();
// JSON FORMAT
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
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }),
);

// MIDDLEWARE
app.use(helmet({ crossOriginResourcePolicy: false,}));
app.use(morgan('combined'));
app.use(compression());
app.use(cors(corsOptions));

//STATICS ASSETS
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



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
