
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import routers from './routes';

require('dotenv').config();
const app = express();
console.log(process.env.MONGODB_URI)
console.log(process.env.JWT_SECRET)

// DB Setup
const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/hsm';


    mongoose.connect(MONGOURL, err => {
        console.log(err || `Connected to MongoDB: ${MONGOURL}`);
    });
    mongoose.Promise = global.Promise;


// App Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routers);
console.log('router starts');
app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, ()=>{
    console.log(`\x1b[32m`, `Server listening on: ${port}`, `\x1b[0m`)
});