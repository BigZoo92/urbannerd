"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
const constant_1 = require("./constant");
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
// INIT
dotenv_1.default.config();
const app = (0, express_1.default)();
// JSON FORMAT
app.use(express_1.default.json());
// SESSION
console.info(constant_1.secret);
app.use((0, cookie_parser_1.default)(constant_1.secret));
app.use((0, express_session_1.default)({
    secret: constant_1.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
}));
// MIDDLEWARE
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false, }));
app.use((0, morgan_1.default)('combined'));
app.use((0, compression_1.default)());
app.use((0, cors_1.default)(constant_1.corsOptions));
//STATICS ASSETS
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// BACKEND'S HOME
app.get('/', (_, res) => {
    res.send('Hello, World!');
});
// ROUTES
app.use('/api', routes_1.default);
// START THE SERVER
app.listen(constant_1.port, () => {
    console.log(`Server is running on port 4000`);
});
