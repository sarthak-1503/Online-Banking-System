if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let nodemon = require("nodemon");
let favicon = require("serve-favicon");
let session = require("express-session");
let app = express();
let sessionConfig = require('./DB-Connect/connect-db').sessionConfig;
let conn = require('./DB-Connect/connect-db').conn;

let authRoutes = require('./routes/authRoutes');
let accountRoutes = require('./routes/accountRoutes');
let homeRoutes = require('./routes/homeRoutes')
let loginRoutes = require('./routes/loginRoutes')

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session(sessionConfig));
app.use(favicon('./public/images/favicon.ico'));
// mongoose.connect("mongodb://localhost:27017/obsdb-otpauth", { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/auth/login',loginRoutes);
app.use('/account', accountRoutes);

// let port = Math.floor(Math.random() * 2 + 1024);
let port = process.env.PORT || 1024;

app.listen(port, () => {
    console.log(`The server is listening on ${port}`);
});
