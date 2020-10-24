let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    // nodemailer = require("nodemailer"),
    bcrypt = require("bcrypt"),
    nodemon = require("nodemon"),
    app = express();

const port = 80;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/obsdb",{useNewUrlParser: true,useUnifiedTopology:true});

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


app.get("/",(req,res)=> {
     res.render('home');
});

let signal = 0,
    details,
    logindetails,
    saltRounds = 10;

app.get("/login",(req,res)=> {
    res.render("login",{signal:signal});
});

app.get("/signup",(req,res)=> {
    res.render("signup",{signal: signal});
});

app.post("/signup",(req,res)=> {
    let email = req.body.email,
        pass = req.body.password;
    
    bcrypt.genSalt(saltRounds, function(err,salt) {
        bcrypt.hash(pass, salt, function(err,hash) {
            if(err)
                console.log(err);
            else
                pass = hash;
        });
    });
    
    logindetails = {
        email: email, 
        password: pass
    };

    Accounts.create(logindetails, (err,logindetails)=> {
        if(err)
            console.log(err);
        else
            console.log(logindetails);
    });

    console.log("Password created successfully.");
    res.redirect("/login");
});

app.get("/accountactivity",(req,res)=> {
    if(signal == 0)
    {
        res.render("login");
    }
    else
    {
        res.render("accountactivity",{Accounts:Accounts, signal:signal});   
    }
});

app.post("/accountactivity",(req,res)=> {

    let email = req.body.email,
        pass = req.body.password;
    
    logindetails = {
        email: email,
        password: pass
    };

    Accounts.find({email: email},(err,record)=> {
        if(err)
            console.log(err);
        else   
        {
            console.log(record);

            if(record.estimatedDocumentCount() == 0)
            {
                console.log("LOGIN AGAIN!!");
                res.render("login");
            }
            else
            {
                bcrypt.compare(pass, record.password, (err,result)=> {
                    if(result)
                    {
                        console.log("LOGIN DONE!!");
                        res.render("transaction",{signal: signal, check: record});
                        signal = 1;
                    }
                    else
                    {
                        console.log("LOGIN PENDING!!");
                        res.render("login");
                    }
                });
            }
        }
    });
});

app.get("/transaction",(req,res)=> {
    if(signal == 0)
    {
        res.render("login");
    } 
    else    
    {
        res.render("transaction",{Accounts:Accounts, signal:signal});  
    }
});

app.get("/personaldetails",(req,res)=> {
    Accounts.findOne(details, (err,record) => { 
        
        if(err)
            console.log(err);
        else 
            console.log(record);
        
        res.render("personaldetails",{Accounts:Accounts, signal:signal, record:record});
    });
    
});

app.get("/create_acc",(req,res)=> {
    if(signal == 0)
    {
        res.render("login");
    }
    else
    {
        res.render("openaccount");
    }
});

app.post("/create_acc",(req,res)=> {

     var name =  req.body.name;
     var address =  req.body.address;
     var gender = req.body.gender;
     var Mobileno1 = req.body.Mobileno1;
     var Mobileno2 = req.body.Mobileno2;
     var Phoneno = req.body.Phoneno;
     var details = {
        name:name,
        address:address,
        gender:gender,
        Mobileno1:Mobileno1,
        Mobileno2:Mobileno2,
        Phoneno:Phoneno
    };

    Accounts.update(logindetails,{$set: details},(err,account_created)=> {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('Account Created');
        }
    });
    res.redirect("/accountactivity");
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

app.listen(port,()=> {
    console.log("THE SERVER IS LISTENING!!");
});