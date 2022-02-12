let express = require("express");
let bcrypt = require("bcrypt");
let mongoose = require('mongoose');
let router = express.Router();
let conn = require("../DB-Connect/connect-db").conn;
let sendOTP = require("../Operations/otpGeneration");
let Accounts = require("../models/accountModel");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");
const methodOverride = require("method-override");
const fs = require("fs");
let { PythonShell } = require("python-shell");
var ObjectId = require("mongodb").ObjectID;
const os = require('os')

let gfs;

conn.on("open", () => {
  console.log("database connected!");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

router.get("/", async (req, res) => {
    res.render("login", { id: null, lastUrl: Accounts.referrer });
  });

  router.post("/", async (req, res) => {
    let email = req.body.Email,
      pass = req.body.p1;

    let record = await Accounts.findOne({ email: email });

    if (record == null) {

      console.log("No account with this email exists!!");
      res.redirect("/auth/signup");
    } else {
      let check = await bcrypt.compare(pass, record.password);

      if (check == true) {

        let url = '/auth/login/options/' + record._id
        res.redirect(url);
      } else {
        console.log("Wrong email or password!!");
        res.redirect(303, "/auth/login");
      }
    }
  });

  router.get('/options/:id',(req,res)=> {
    res.render('loginoptions',{ id : null, tempId : req.params.id });
  });

  router.get('/otpnotif/:id',async(req,res)=> {
    let record = await Accounts.findOne({ _id : req.params.id }).catch(err => {
      console.log(err);
    });
    let otp = sendOTP(record.email);

    Accounts.updateOne({ _id: record._id }, { $set: { otp: otp } })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });

    req.session.user_id = null;

    res.render('otpNotif',{ id : null, tempId : req.params.id, record: record })
  })

  router.get("/otp-validate/:id", async (req, res) => {
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

      let url = "/auth/login/otp-validate/" + id;
      res.render("otpValidate", {
        count: record.otpCount,
        id: req.session.user_id,
        record: record,
        url: url,
      });

  });

  router.post("/otp-validate/:id", async (req, res) => {
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
      let url = "/auth/login/otp-validate/" + record._id;
      res.redirect(url);
    }
  });

  router.get("/webcam-validate/:id", async (req, res) => {
    let id = req.params.id;
    console.log("id : ", id);
    let record = await Accounts.findOne({ _id: id }).catch((err) => {
      console.log("id error : ", err);
    });

    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "Webcam-Access",
      args: [id],
      // record.name,
    };

    PythonShell.run("capture-images.py", options, function (err, result) {
      if (err) throw err;
      console.log("result: ", result.toString());
    });

    let fileRecord = await gfs.files.find({ _id: ObjectId(record.fileId) }).toArray().catch((err) => {
          console.log("File find error : ", err);
        })

      var readstream = gfs.createReadStream({
            filename: fileRecord[0].filename
      });

      console.log(fileRecord[0]);
      // res.writeHead(200, {'Content-Type': 'image/jpeg'});
      let filePath = id + "/" + record.name + ".jpg"
      // path.join(__dirname, '/../../../../' + )
      // console.log(__dirname + '/../../../../')
      console.log(filePath)

      let chunks = []

      readstream.on('data', function(chunk) {
        chunks.push(chunk)
      });

      const userHomeDir = os.homedir();

      readstream.on('end',async()=> {
        console.log('readstream ended')
        console.log(chunks)


        chunks = Buffer.concat(chunks)
          let chunk = Buffer(chunks).toString('base64')

          res.render("FaceRecognition", {
            name: record.name,
            id: null,
            tempId: req.params.id,
            capturedfile: filePath,
            chunk: chunk
          });
      })
  });

  router.post("/webcam-validate/:id", async (req, res) => {
    let id = req.params.id;
    let record = await Accounts.findOne({ _id: id });
    let conclude = req.body.conclusion;
    if (conclude === false) id = null;
    req.session.user_id = id;

    fs.unlink(
      os.homedir() + "/Desktop/" + id + ".jpg",
      (error) => {
        if (error) {
          console.error("there was an error:", error);
        }
      }
    );

    // fs.rmdirSync(os.homedir() + "/Desktop/" + id, { recursive: true });

    console.log("successfully deleted the file source");

    console.log(conclude);
    console.log(req.session.user_id);

    if (conclude === true) {
      console.log(id);
      res.redirect("/");
    } else {
      console.log(req.session.user_id);
      res.redirect("/auth/login");
    }
  });

  module.exports = router;