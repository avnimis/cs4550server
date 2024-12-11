import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from './Users/routes.js';
import ProductRoutes from './Products/routes.js';
import ReveiwRoutes from './Reviews/routes.js';
import session from "express-session";

const CONNECTION_STRING = "mongodb://localhost:27017/swatched"
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "swatched",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));
app.use(express.json()); //endure this statement is after CORS call
//approach to encode the data as JSON in the HTTP request body which allows for arbitrarily large amounts of data as well as secure data encryption.

UserRoutes(app);
ReveiwRoutes(app);
ProductRoutes(app);

app.listen(process.env.PORT || 4000)