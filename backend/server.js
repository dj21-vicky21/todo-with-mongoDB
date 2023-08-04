const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router =require('./routes/todoRoutes')
const basicAuth = require('express-basic-auth');

require("dotenv").config(); 

const app = express()
const PORT = process.env.PORT || 5000
const {USER_NAME , PASSWORD} = process.env

const basicAuthConfig = {
    users: { [USER_NAME] : PASSWORD },
    challenge: true,
  };

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json());


app.use(cors());
app.use(basicAuth(basicAuthConfig));

app.use(express.urlencoded({ extended: false }));

mongoose
.connect(process.env.MONGOODB_URL_test, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((e)=>{console.log(`connected to Mongoodb...`)})
.catch((err)=>{console.log(err)})

app.use(router)

app.listen(PORT,()=>{
    console.log(`listinging on ${PORT}`);
})