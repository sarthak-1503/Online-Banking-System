let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();

app.set("view engine","ejs");
bodyParser.urlencoded({extended: true});
app.connect("mongodb://localhost/obsdb");

let Accounts = new mongoose.Schema({
    name: String,
    address: String,
    contact: Number,
    email: String,
    account_no: Number,
    current_balance: Number,
    transactions: {
        amount: Number,
        typeOftransac: String,
        date: Date
    }
});

let Acc = mongoose.model("Acc",Accounts);

app.listen(80,"127.0.0.1",(req,res)=> {
    console.log("THE SERVER IS LISTENING!!");
});
