const mongoose = require("mongoose");
const {seedMongoDb}=require('./seeders/seeder');

// Connect to MongoDB: 
mongoose.connect("mongodb://test:test@cluster0-shard-00-00-b9hbc.mongodb.net:27017,cluster0-shard-00-01-b9hbc.mongodb.net:27017,cluster0-shard-00-02-b9hbc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", (err)=> {
    console.log("We're connected to MongoDB.");
    seedMongoDb();
});

module.exports={
    mongoose
}
