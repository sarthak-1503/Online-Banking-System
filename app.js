let express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    bcrypt = require("bcrypt"),
    nodemon = require("nodemon"),
    session = require("express-session"),
    app = express();

const port = 80;
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:"yes its secret"}));
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

const requireLogin = (req,res,next)=>{
    req.session.returnto = req.url;
    if(!req.session.user_id)
    {
        return res.redirect("/login");
    }
    next()
};

let signal = 0,
    logindetails = {},
    details={},
    saltRounds = 5;
let f=0,fromlogin=0;

app.get("/",async(req,res)=> {
    
    let record = await Accounts.findOne({_id:req.session.user_id});
    
    if(record != null)
    {
        signal = 1;
        res.render("home",{signal:signal, record:record});
    }
    else
    {
        signal = 0;
        res.render("home",{signal:signal});
    }

});

app.get("/login",async(req,res)=> {

    if(req.session.user_id != null)
    {
        res.render("login",{signal:signal,fromlogin:fromlogin})
    }
    else
    {
        res.render("login",{signal:signal,fromlogin:fromlogin});
    }
});

app.post("/login",async(req,res)=> {
    let email = req.body.Email,
        pass = req.body.p1;
    
    logindetails = {
        email: email,
        password: pass,
    };

    let record = await Accounts.findOne({email: email});
    
    if(record == null)
    {
        signal = 0;
        console.log("No account with this email exists!!");
        res.redirect("/signup");
    }
    
    else
    {
        let check = await bcrypt.compare(pass,record.password);

        if(check == true)
        {
            console.log("LOGIN DONE!!");
            signal = 1;
            fromlogin = 0;
            req.session.user_id = record._id;
            let url = req.session.returnto;

            if(url != null)
                res.redirect(url);
            else
                res.redirect("/");
        }
        else
        {
            signal = 0;
            fromlogin = 1;
            console.log("Wrong email or password!!");
            res.redirect("/login");
        }
    }
});

app.get("/signup",(req,res)=> {
    res.render("signup",{signal: signal,f:f});
});

app.post("/signup",(req,res)=> {
    let email = req.body.email;
    let  create = req.body.p1;
    let confirm = req.body.p2;
    let name = req.body.name;
    let pass = create;
    var totalAmount = 0;
    
    if(create == confirm) {

        bcrypt.genSalt(saltRounds, function(err,salt) {
            bcrypt.hash(pass, salt, function(err,hash) {
                if(err)
                    console.log(err);
                else
                {
                    pass = hash;
                    logindetails = {
                        name: name,
                        email: email, 
                        password: pass,
                        total_amount: totalAmount
                    };
                    
                    Accounts.create(logindetails, (err,logindetails)=> {
                        if(err)
                            console.log(err);
                        else
                            console.log(logindetails);
                    });
                    console.log("Account created successfully.");
                    signal = 1;
                    f=0;
                    res.redirect("/");
                }   
            });
        });    
    }

    else {
        signal = 0;
        f=1;
        console.log("Passwords don't match!! try again...")
        res.redirect("/signup");
    }
});

app.get("/transaction",requireLogin,async(req,res)=> {

    let record = await Accounts.findOne({_id:req.session.user_id});
    res.render("transaction",{signal:signal,record:record});
});

app.get("/create_acc",requireLogin,async(req,res)=> {
    
    let record = await Accounts.findOne({_id:req.session.user_id});
    res.render("openaccount",{signal:signal,record:record});
});

app.post("/create_acc",async(req,res)=> {

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

    let record = await Accounts.findOne({_id:req.session.user_id});

   Accounts.updateOne(record,{$set: details},(err,rec)=> {
       if(err)
       {
           console.log(err);
       }
       else
       {
           console.log('Account Created');
           res.redirect("/");
       }
   });
});

app.get("/personaldetails",requireLogin,async(req,res)=> {
    
    let record = await Accounts.findOne({_id:req.session.user_id});
    res.render("personaldetails",{signal:signal,record:record});
});
    
app.get("/view",async(req,res)=> {
    let record = await Accounts.findOne({_id:req.session.user_id});
    let Account = record;
    res.render("view",{Account:Account,record:record,signal:signal});
});

app.post("/view",async(req,res)=>{
    var total;
    var amt = req.body.trans_amount;
    amt = parseInt(amt); 
    var type = req.body.trans_type;
    var date = new Date()
    let record = await Accounts.findOne({_id:req.session.user_id});

    total = record.total_amount;
    total = parseInt(total);
    if(type=="withdrawl") 
    {
        if(amt>0 && amt<total)
        {
            Accounts.updateOne(record,{$set:{total_amount:total-amt},$push:{transactions:[{amount:amt,typeOftransac:type,dateANDtime:date}]}},function(err,transaction){
                    if(err)
                    { 
                        console.log(err);
                    }
                    else
                    {
                        console.log(transaction);
                        res.redirect("/view");
                    }
                });
            
        }
        else
        {
            res.render("alert");
        }
    }
    else if(type=="deposit")
    {
        Accounts.updateOne(record,{$set:{total_amount:(total+amt)},$push:{transactions:[{amount:amt,typeOftransac:type,dateANDtime:date}]}},function(err,transaction){
            if(err)
            { 
                console.log(err);
            }
            else
            {
                console.log(transaction);
                res.redirect("/view");
            }
        });
    }  
 
}); 

app.get("/logout",(req,res)=> {
    req.session.destroy();
    res.redirect("/");
})

app.listen(port,()=> {
    console.log("THE SERVER IS LISTENING!!");
});
