let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    // nodemailer = require("nodemailer"),
    app = express();

const port = 80;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/obsdb",{useNewUrlParser: true,useUnifiedTopology:true});
//console.log(mongoose.connect.readyState);

let transactionSchema = new mongoose.Schema({
    amount: Number,
    typeOftransac: String,
    dateANDtime : Date
})

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
    password: String,
    transactions:[transactionSchema]
});
let Accounts = mongoose.model("Accounts",AccountsSchema);

//  Accounts.create(
//      { name: "japnit", 
//        transactions:[ 
//        {
//          amount: 15000,
//          typeOftransac: "deposit",
//          dateANDtime: "2020-10-17"
//        },
//        {
//          amount:23000,
//          typeOftransac: "withdrawl",
//          dateANDtime: "2020-10-19"
//        }
//      ]},
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
    res.render("transaction");
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
                    Phoneno:Phoneno};

    Accounts.create(details,(err,account_created)=> {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log('Account Created');
            res.render("newpass");
        }
    });

    // var transporter = nodemailer.createTransport({

    //     service: 'gmail',
    //     secure: false,
    //     auth: {
    //         user: email
    //     }
    // });

    // var mailOptions = {
    //     from: 'sarthakarora1503@gmail.com',
    //     to: email,
    //     subject: 'Set your password',
    //     html: "<a href='/newpass'>Click here to set your online account password</a>"
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
});

app.get("/newpass",(req,res)=> {
    res.render("newpass");
});

app.post("/newpass",(req,res)=> {
    
    let temp = Accounts;
    temp.find({}).sort();
    let pass = req.body.password,
        t = temp.findOne();
    let name = t["name"],
        email = t["email"];
    Accounts.update({name: name, email: email},{$set: {password: pass}});
    console.log("Password created successfully.");
    res.redirect("/");
});

app.get("/view",(req,res)=> {
    Accounts.find({},function(err,alltransaction){
        if(err)
        {
                console.log(err);
        }
        else
        {
            res.render("view",{Account:alltransaction});
        }    
    })
});


app.listen(port,'127.0.0.1',()=> {
    console.log("THE SERVER IS LISTENING!!");
});