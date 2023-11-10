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
    user: AuthSchemaType;
  }
}

// INIT
dotenv.config();
const app = express();
app.use(express.json());

// MIDDLEWARE
app.use(helmet());
app.use(cookieParser(secret));
app.use(cors(corsOptions));

// SESSION
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  }),
);

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
