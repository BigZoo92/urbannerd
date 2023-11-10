import { CorsOptions } from 'cors';
7;

// WHITELIST
export const whitelist = ['http://localhost:3000'];

// CORS
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export const port = process.env.PORT || 4000;

export const secret = process.env.SESSION_SECRET || 'session_secret_not_found';

export const jwtToken = process.env.JWT_SECRET || 'jwt_secret_not_found';
