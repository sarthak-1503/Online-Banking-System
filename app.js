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

app.get("/",(req,res)=> {
    res.render("home");
});

app.get("/login",(req,res)=> {
    res.render("login");
});

app.get("/openaccount",(req,res)=> {
    res.render("openaccount");
});

app.get("/personaldetails",(req,res)=> {
    res.render("personaldetails");
});

app.get("/transaction",(req,res)=> {
    res.render("transaction");
});

app.listen(80,"127.0.0.1",(req,res)=> {
    console.log("THE SERVER IS LISTENING!!");
});
