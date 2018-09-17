const express = require("express"); 
const bodyParser = require("body-parser"); 
const path = require('path');
const fs = require('fs');
const cors=require('cors');

const bookController=require('./book');
const countryController=require('./country');
const clientController=require('./client');

const mongoose = require("./../models/index");


const basePath = path.join(__dirname + "/../views");


// Create express app:
const app = express();
app.use(cors())
// Use middlewares - parse request's body to json:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use middlewares - enable all the files in the folder:
app.use(express.static(basePath));   

// return to every "bookStore" req a html page
app.get("/bookStore",(req,res)=>{  
    res.sendFile(basePath+"/index.html");
});

bookController.init(app);
countryController.init(app);
clientController.init(app);

app.listen(process.env.PORT || 8000, ()=>{console.log(`server listening`);});