import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes';
import { corsOptions, port, secret, bddUrl } from './constant';
import { AuthSchemaType } from './types';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';
import ConnectPgSimple from 'connect-pg-simple';

declare module 'express-session' {
  interface Session {
    user: string | null;
  }
}

const pgSession = ConnectPgSimple(session);

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
      sameSite: 'none', // Important pour les cookies cross-origin
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
    },
    store: new pgSession({
      conString: bddUrl, 
      errorLog: (message) => console.error('Session Store Error:', message),
      createTableIfMissing: true
    }),
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
  console.log(`Server is running on port 4000`);
});
