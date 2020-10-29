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
});
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
    total_amount: Number,
    transactions:[transactionSchema]
});
let Accounts = mongoose.model("Accounts",AccountsSchema);

let signal = 0,
    logindetails = {},
    details={},
    saltRounds = 5,
    f=0,
    rec;

app.get("/",(req,res)=> {

    // console.log("signal: "+signal);
    if(logindetails != null)
    {
        Accounts.findOne(logindetails, (err,record)=> {
            if(err)
            {
                console.log(err);
            }
            else
            {
                rec = record;
                res.render("home",{signal:signal, record:record});           
            }
        });
    }
    else
    {
        res.render("home",{signal:signal});
    }
});

app.get("/login",(req,res)=> {
    res.render("login",{f:f});
});

app.post("/login",(req,res)=> {
    let email = req.body.Email,
        pass = req.body.p1;
    
    logindetails = {
        email: email,
        password: pass,
    };
    // console.log("login="+logindetails);

    Accounts.findOne({email: email},(err,record)=> {
        if(err)
        {
            console.log(err);
        }
        else    
        {
            // console.log(record);

            if(record == null)
            {
                console.log("No account with this email exists!!");
                f=-1;
                res.redirect("/login");
            }
            else
            {
                bcrypt.hash(record.password, saltRounds, (err,hash)=> {
                    bcrypt.compare(pass, hash, (err,result)=> {
                        if(result)
                        {
                            console.log("LOGIN DONE!!");
                            if(signal == 2)
                            {
                                signal = 1;
                                res.redirect("/create_acc");
                            }
                            else if(signal == 3)
                            {
                                signal = 1;
                                res.redirect("/transaction");
                            }
                            else
                            {
                                signal = 1;
                                res.redirect("/");
                            }
                        }
                        else
                        {
                            signal = 0;
                            console.log("LOGIN PENDING!!");
                            f=-1;
                            res.redirect("/login");
                        }
                    });
                });
            }
            
        }
    });
});

app.get("/signup",(req,res)=> {
    res.render("signup",{signal: signal});
});

app.post("/signup",(req,res)=> {
    let email = req.body.email,
        pass = req.body.p1,
        name = req.body.name;
    var totalAmount = 0;
    
    bcrypt.genSalt(saltRounds, function(err,salt) {
        bcrypt.hash(pass, salt, function(err,hash) {
            if(err)
                console.log(err);
            else
                pass = hash;
                
        });
    });
    
    logindetails = {
        name: name,
        email: email, 
        password: pass,
        total_amount: totalAmount
    };
    console.log(logindetails);
    Accounts.create(logindetails, (err,logindetails)=> {
        if(err)
            console.log(err);
        else
            console.log(logindetails);
    });
    console.log("Password created successfully.");
    signal = 1;
    res.redirect("/");
});

app.get("/transaction",(req,res)=> {
    if(signal != 1)
    {
        signal = 3;
        res.redirect("/login");
    }
    else
    {
        // console.log("transaction:"+logindetails);
        Accounts.findOne(logindetails,function(err,payments){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render("transaction",{Account:payments,signal:signal,record:rec});
            }    
        });
    }
});

app.get("/create_acc",(req,res)=> {
    if(signal != 1)
    {
        signal = 2;
        res.redirect("/login");
    }
    else
    {
        res.render("openaccount",{signal:signal,record:rec});
    }
});

app.post("/create_acc",(req,res)=> {

    var name =  req.body.name;
    var address =  req.body.address;
    var email = req.body.email;
    var gender = req.body.gender;
    var Mobileno1 = req.body.Mobileno1;
    var Mobileno2 = req.body.Mobileno2;
    var Phoneno = req.body.Phoneno;
    var total_amount = 0;

    details = {
        name: name,
        address: address,
        email: email,
        gender: gender,
        Mobileno1: Mobileno1,
        Mobileno2: Mobileno2,
        Phoneno: Phoneno,
        total_amount:total_amount
    }

   Accounts.updateOne(logindetails,{$set: details},(err,account_created)=> {
       if(err)
       {
           console.log(err);
       }
       else
       {
           console.log('Account Created');

       }
   });
   res.redirect("/");
});

app.get("/personaldetails",(req,res)=> {
    Accounts.findOne(details, (err,record) => { 
        // if(err)
        //     console.log(err);
        // else 
        //     // console.log(record);

        res.render("personaldetails",{Accounts:Accounts, signal:signal, record:record});
    });

});
    
app.get("/view",(req,res)=> {

    Accounts.findOne(logindetails,function(err,alltransaction){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("view",{Account:alltransaction,record:rec});
        }    
    });
});

app.post("/view",(req,res)=>{
    var total;
    var amt = req.body.trans_amount;
    amt = parseInt(amt); 
    var type = req.body.trans_type;
    var date = new Date()
    console.log(logindetails);
   Accounts.findOne(logindetails,function(err,alltransaction){
        if(err)
        {
            console.log(err);
        }
        else
        {
            total = alltransaction.total_amount;
            // console.log(alltransaction);
            total = parseInt(total);
            if(type=="withdrawl") 
            {
                if(amt<total-1000)
                {
                Accounts.updateOne(logindetails,{$set:{total_amount:total-amt},$push:{transactions:[{amount:amt,typeOftransac:type,dateANDtime:date}]}},function(err,transaction){
                        if(err)
                        { 
                            console.log(err);
                        }
                        else
                        {
                            console.log(transaction);
                        }
                    });
                    res.redirect("view");
                }
                else
                {
                res.render("alert")
                }
            }
            else if(type=="deposit")
            {
                console.log(total);
                console.log(amt);
                Accounts.updateOne(logindetails,{$set:{total_amount:(total+amt)},$push:{transactions:[{amount:amt,typeOftransac:type,dateANDtime:date}]}},function(err,transaction){
                    if(err)
                    { 
                        console.log(err);
                    }
                    else
                    {
                        console.log(transaction);
                    }
                });
                res.redirect("view");
            }  
        }
    });   
}); 

app.listen(port,()=> {
    console.log("THE SERVER IS LISTENING!!");
});