const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {MongooseService}=require('./mongoose.service');
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
require('dotenv').config();



const Thing = require("./models/things");

MongooseService.connectToDatabase()


const app = express();

//autoriser le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;