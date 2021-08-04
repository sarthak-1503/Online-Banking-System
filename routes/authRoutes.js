let express = require('express');
let bcrypt = require('bcrypt');
let router = express.Router();
let Accounts = require('../models/accountModel');

router.get("/login", async (req, res) => {
    res.render("login", { id: req.session.user_id, lastUrl : Accounts.referrer });
});

router.post("/login", async (req, res) => {
    let email = req.body.Email,
        pass = req.body.p1;

    let logindetails = {
        email: email,
        password: pass,
    };

    let record = await Accounts.findOne({ email: email });

    if (record == null) {
        signal = 0;
        console.log("No account with this email exists!!");
        res.redirect("/auth/signup");
    }
    else {
        let check = await bcrypt.compare(pass, record.password);

        if (check == true) {
            console.log("LOGIN DONE!!");
            signal = 1;
            fromlogin = 0;
            req.session.user_id = record._id;
            let url = req.session.returnto;

            if (url != null)
                res.redirect(url);
            else
                res.redirect("/");
        }
        else {
            console.log("Wrong email or password!!");
            res.redirect(303, "/auth/login");
        }
    }
});

router.get("/signup", (req, res) => {
    res.render("signup", { id: req.session.user_id});
});

router.post("/signup", (req, res) => {
    let email = req.body.email;
    let create = req.body.p1;
    let name = req.body.name;
    let pass = create;
    var totalAmount = 0;
    let saltRounds = 10;

    let logindetails = {
        name: name,
        email: email,
        password: pass,
        total_amount: totalAmount
    };

    Accounts.findOne({email:email},(err,record)=> {
        if(err) {

            console.log(err);
            res.status(500).send('error:',err);

        } else if(record != null && record != undefined) {

            console.log(record);
            res.status(404).send('User already exists!');

        } else {

            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(pass, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        logindetails.password = hash;
        
                        Accounts.create(logindetails, (err, logindetails) => {
                            if (err)
                                console.log(err);
                            else
                                console.log(logindetails);
                        });
        
                        console.log("Account created successfully.");
                        res.redirect(303,'/auth/login');
                    }
                });
            });

        }
    });

    
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})


module.exports = router;