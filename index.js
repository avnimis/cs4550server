import express from 'express';
import mongoose from "mongoose";

const CONNECTION_STRING = "mongodb://localhost:27017/swatched"
mongoose.connect(CONNECTION_STRING);
const app = express()
app.listen(4000)