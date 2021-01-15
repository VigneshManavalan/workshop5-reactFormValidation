const express = require("express")
const app = express()
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const Record = require("./Models/RecordSchema")
const connectToDatabase = () => {
    const mongoDB = 'mongodb://127.0.0.1:27017/users';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error',()=>{console.log("Error")});
    db.once('open', () =>{
        console.log("Successfully connected to Records DB");
    });
}
app.use(bodyParser.json())

app.post("/user",(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const userToInsert = new User({
        email,
        password
    })

    userToInsert.save().then(data=>{
        res.json(data._id)})
})

connectToDatabase()