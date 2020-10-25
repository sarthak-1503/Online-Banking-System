let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    // nodemailer = require("nodemailer"),
    bcrypt = require("bcrypt"),
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


app.get("/",(req,res)=> {
     res.render('home');
});

let signal=0,
    details,
    logindetails,
    saltRounds = 10;


app.get("/login",(req,res)=> {
    signal = 1;
    res.render("login");
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
        alert("You need to be logged in first!!");
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
    Accounts.find({},function(err,payments){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("transaction",{Account:payments});
        }    
    });
})

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
        alert("You need to be logged in first!!");
        res.redirect("/login");
    }
    else
    {
        res.render("openaccount");
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

    var details = {
       name:name,
       address:address,
       email: email,
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
    Accounts.findOne({name:"japnit"},function(err,alltransaction){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("view",{Account:alltransaction});
        }    
    });
});
});

app.post("/view",(req,res)=>{
    var total;
    var amt = req.body.trans_amount;
    amt = parseInt(amt); 
    var type = req.body.trans_type;
    var date = new Date()
   Accounts.findOne({name:"japnit"},function(err,alltransaction){
        if(err)
        {
            console.log(err);
        }
        else
        {
          total = alltransaction.total_amount;
          total = parseInt(total);
         if(type=="withdrawl") 
         {
            if(amt<total-1000)
            {
               Accounts.update({name:"japnit"},{$set:{total_amount:total-amt},$push:{transactions:[{amount:amt,typeOftransac:type,dateANDtime:date}]}},function(err,transaction){
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
            Accounts.update({name:"japnit"},{$set:{total_amount:(total+amt)},$push:{transactions:[{amount:amt,typeOftransac:type,dateANDtime:date}]}},function(err,transaction){
                if(err)
                 { 
                    console.log(err);
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
