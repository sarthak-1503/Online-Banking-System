let express = require("express");
let bcrypt = require("bcrypt");
let router = express.Router();
let Accounts = require("../models/accountModel");
let sendOTP = require("../Operations/otpGeneration");

router.get("/login", async (req, res) => {
  res.render("login", { id: req.session.user_id, lastUrl: Accounts.referrer });
});

router.post("/login", async (req, res) => {
  let email = req.body.Email,
    pass = req.body.p1;

  let record = await Accounts.findOne({ email: email });

  if (record == null) {
    // signal = 0;
    console.log("No account with this email exists!!");
    res.redirect("/auth/signup");
  } else {
    let check = await bcrypt.compare(pass, record.password);

    if (check == true) {
      let otp = sendOTP(record.email);

      Accounts.updateOne({ _id: record._id }, { $set: { otp: otp } })
        .then((r) => {
          console.log(r);
        })
        .catch((err) => {
          console.log(err);
        });

      req.session.user_id = null;
      let url = "/auth/login/validate/" + record._id;
      res.redirect(url);
    } else {
      console.log("Wrong email or password!!");
      res.redirect(303, "/auth/login");
    }
  }
});

router.get("/login/validate/:id", async (req, res) => {
  let id = req.params.id;
  let record = await Accounts.findOne({ _id: id });

  if(record.otpCount > 3)
  {
    record.otpCount = 0;
  }

  record.otpCount++;

  Accounts.updateOne({ _id: id }, { $set: { otpCount: record.otpCount  } })
    .then((r) => {
      console.log(r);
    })
    .catch((err) => {
      console.log(err);
    });

    let url = "/auth/login/validate/" + id;
    res.render("otpValidate", {
      count: record.otpCount,
      id: req.session.user_id,
      record: record,
      url: url,
    });

  // if (record.otpCount > 3) {
  //   res.render("otpAlert", { record, id: req.session.user_id });
  // } else {
    
  // }
});

router.post("/login/validate/:id", async (req, res) => {
  let otp = req.body.otp.toLocaleString();
  let id = req.params.id;
  let record = await Accounts.findOne({ _id: id });

  if (otp == record.otp) {
    Accounts.updateOne({ _id: id }, { $set: { otp: "", otpCount: 0 } })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("LOGIN DONE!!");

    req.session.user_id = record._id;

    res.redirect("/");
  } else {
    console.log("Invalid OTP!");
    req.session.user_id = null;
    let url = "/auth/login/validate/" + record._id;
    res.redirect(url);
  }
});

router.get("/signup", (req, res) => {
  res.render("signup", { id: req.session.user_id });
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
    total_amount: totalAmount,
  };

  Accounts.findOne({ email: email }, (err, record) => {
    if (err) {
      console.log(err);
      res.status(500).send("error:", err);
    } else if (record != null && record != undefined) {
      console.log(record);
      res.status(404).send("User already exists!");
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(pass, salt, function (err, hash) {
          if (err) {
            console.log(err);
          } else {
            logindetails.password = hash;

            Accounts.create(logindetails, (err, logindetails) => {
              if (err) console.log(err);
              else console.log(logindetails);
            });

            console.log("Account created successfully.");
            res.redirect(303, "/auth/login");
          }
        });
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
