let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    nodemailer = require('nodemailer'),
    app = express();

const port = 80;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/obsdb",{useNewUrlParser: true,useUnifiedTopology:true});
//console.log(mongoose.connect.readyState);


let AccountsSchema = new mongoose.Schema({
    name: String,
    address: String,
    Mobileno1: Number,
    Mobileno2: Number,
    Phoneno: Number,
    gender: String,
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

//  Accounts.create(
//      { name: "japnit", transactions: {
//          amount: 15000,
//          typeOftransac: "deposit",
//          dateANDtime: Date.now()
//      }},
//      function(err,account){
//          if(err){
//              console.log(err);
//          }
//          else{
//              console.log("Account Created");
//              console.log(account);
//          }
//      });

app.get("/",(req,res)=> {
     res.render('home');
});

let signal=0;
app.get("/login",(req,res)=> {
    signal = 1;
    res.render("login");
});

app.get("/personaldetails",(req,res)=> {
    res.render("personaldetails",{Accounts:Accounts, signal:signal});
});

app.get("/transaction",(req,res)=> {
    if(signal == 0)
        res.render("login");
    else
        res.render("transaction",{Accounts:Accounts, signal:signal});   
});

let details1 = {}, details2 = {};
app.post("/transaction",(req,res)=> {
    let email = req.body.email,
        mobile = req.body.Mobileno1,
        account = req.body.account_no;
    
    details1 = {
        email: email,
        Mobileno1: mobile,
        account_no: account
    }

    details2 = {
        email: email,
        Mobileno2: mobile,
        account_no: account
    }

    res.redirect("/transaction");
});

app.get("/view",(req,res)=> {

    res.render("view",{Accounts:Accounts, signal:signal, details1:details1, details2:details2});
});


app.get("/create_acc",(req,res)=> {
    res.render('openaccount');
});

app.post("/create_acc",(req,res)=> {

     var name =  req.body.name;
     var address =  req.body.address;
     var email = req.body.email;
     var gender = req.body.gender;
     var Mobileno1 = req.body.Mobileno1;
     var Mobileno2 = req.body.Mobileno2;
     var Phoneno = req.body.Phoneno;
     var details = {name:name,address:address,
                    email:email,gender:gender,
                    Mobileno1:Mobileno1,Mobileno2:Mobileno2,
                    Phoneno:Phoneno}

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bank@gmail.com'
        }
    });

    var mailOptions = {
        from: 'bank@gmail.com',
        to: email,
        subject: 'Set your password',
        text: 'Click on the link given below to set your online account password'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

     Accounts.create(details,(err,account_created)=> {
         if(err)
         {
             console.log(err);
         }
         else{
             console.log('Account Created');
             res.redirect('/');
         }
     })
});

app.listen(port,()=> {
    console.log("THE SERVER IS LISTENING!!");
});