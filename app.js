let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let nodemon = require("nodemon");
let session = require("express-session");
let app = express();

let authRoutes = require('./routes/authRoutes');
let accountRoutes = require('./routes/accountRoutes');
let homeRoutes = require('./routes/homeRoutes')

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({ secret: "yes its secret" }));
mongoose.connect("mongodb://localhost:27017/obsdb", { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', homeRoutes)
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);

let port = Math.floor(Math.random() * 2 + 1024);

app.listen(port, () => {
    console.log(`The server is listening on ${port}`);
});
