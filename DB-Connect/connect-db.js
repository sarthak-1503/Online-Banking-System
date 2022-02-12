let MongoStore = require('connect-mongo');
let mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET;

let conn = new mongoose.createConnection(dbUrl);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24*3600
});

store.on('error',(e) => {
    console.log('Error while connecting to mongo :',e);
});

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUnitialized: true
};

module.exports = {conn,sessionConfig};