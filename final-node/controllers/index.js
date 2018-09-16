// Requires:
const express = require("express"); 
const bodyParser = require("body-parser"); 

const bookController=require('./book');
const countryController=require('./country');
const clientController=require('./client');
var cors = require('cors');
const mongoose = require("./../models/index");

// Create express app:
const app = express();

// Use middlewares - parse request's body to json:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// Use middlewares - enable all the files in the folder:
app.use(express.static("C:\\Users\\User\\Desktop\\final-node\\views"));   

// return to every "bookStore" req a html page
app.get("/bookStore",(req,res)=>{  
    res.sendFile("C:\\Users\\User\\Desktop\\final-node\\views\\index.html");
});

bookController.init(app);
countryController.init(app);
clientController.init(app);

app.listen(process.env.PORT || 8000, ()=>{console.log(`server listening`);});