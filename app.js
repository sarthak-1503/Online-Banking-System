let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();

const port = 80;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/obsdb",{useNewUrlParser:true,useUnifiedTopology:true}); 

let AccountsSchema = new mongoose.Schema({
    name: String,
    gender: String,
    address: String,
    contact: Number,
    email: String,
    account_no: Number,
    current_balance: Number,
    transactions: {
        amount: Number,
        typeOftransac: String,
        dateANDtime: Date
    }
});

let Accounts = mongoose.model("Accounts",AccountsSchema);

app.get("/login",(req,res)=> {
    res.render("login");
});

app.get("/personaldetails",(req,res)=> {
    res.render("personaldetails");
});

app.get("/transaction",(req,res)=> {
    res.render("transaction",{Acc : Acc});
});

app.listen(port,()=> {
    console.log("THE SERVER IS LISTENING!!");
});
