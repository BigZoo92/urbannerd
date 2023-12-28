"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = exports.jwtToken = exports.secret = exports.stripeSecretKey = exports.port = exports.corsOptions = exports.whitelist = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// WHITELIST
exports.whitelist = ['http://localhost:3000'];
// CORS
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin || exports.whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
exports.port = process.env.PORT || 4000;
exports.stripeSecretKey = process.env.STRIPE_SECRET_KEY;
exports.secret = process.env.SESSION_SECRET || 'session_secret_not_found';
exports.jwtToken = process.env.JWT_SECRET || 'jwt_secret_not_found';
console.info(exports.port);
console.info(exports.stripeSecretKey);
console.info(exports.secret);
console.info(exports.jwtToken);
exports.storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path_1.default.extname(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({ storage: exports.storage }).fields([
    { name: 'files', maxCount: 4 },
    { name: 'pp', maxCount: 1 },
    { name: 'images', maxCount: 4 },
    { name: 'model3D', maxCount: 4 },
]);
