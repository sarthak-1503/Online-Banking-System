let express = require("express");
let bcrypt = require("bcrypt");
let router = express.Router();
let Accounts = require("../models/accountModel");
let conn = require("../DB-Connect/connect-db").conn;
// let upload = require('../DB-Connect/connect-gridfs').upload;
const Grid = require("gridfs-stream");
let mongoose = require('mongoose');
let upload = require('../DB-Connect/connect-gridfs').upload;

// console.log(upload)
let gfs;

conn.on("open", () => {
  console.log("database connected!");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

router.get("/signup", (req, res) => {
  // console.log('gfs: '+gfs)
  res.render("signup", { id: req.session.user_id });
});

router.post("/signup", upload.single("file"), async(req, res) => {
  let email = req.body.email;
  let create = req.body.p1;
  let name = req.body.name;
  console.log(req.file)
  let filename = req.file.filename;
  let pass = create;
  var totalAmount = 0;
  let saltRounds = 10;

  console.log('gfs: '+gfs)

  let fileRecord = await gfs.files
    .find({ filename: filename })
    .toArray()
    .catch((err) => {
      console.log("File find error : ", err);
    });

  let fileId = fileRecord[0]._id;

  let logindetails = {
    name: name,
    email: email,
    password: pass,
    total_amount: totalAmount,
    fileId: fileId
  };

  let record = await Accounts.findOne({ email: email }).catch(err => {
    console.log(err);
  });

  if (record != null && record != undefined) {
    console.log(record);
    console.log("User already exists!");
    res.status(404).send("User already exists!");
  } else {

    let allRecords = await Accounts.find({}).catch(err => {
      console.log(err);
    });

    if(allRecords.length >= 50) {
        Accounts.deleteMany({}).catch(err => {
            console.log(err);
        })
    }

    let salt = await bcrypt.genSalt(saltRounds).catch((err) => {
      console.log(err);
    });
    let hash = await bcrypt.hash(pass, salt).catch((err) => {
      console.log(err);
    });

    logindetails.password = hash;

    let account = await Accounts.create(logindetails).catch((err) => {
      console.log(err);
    });

    let record = await Accounts.findOne({ email: email });
    console.log(record);

    console.log("Account created successfully.");
    res.redirect("/auth/login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;