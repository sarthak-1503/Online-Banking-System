let mongoose = require('mongoose');
let transactionSchema = require('./transactionModel');

let AccountsSchema = new mongoose.Schema({
    name: String, 
    address: String,
    Mobileno1: Number,
    Mobileno2: Number,
    Phoneno: Number,
    gender: String,
    email: String,
    account_no: Number,
    password: String,
    total_amount: Number,
    fileId: String,
    otp: {
        type: String,
        default: ""
    },
    otpCount: {
        type: Number,
        default: 0
    },
    transactions:[transactionSchema]
});

AccountsSchema.index({name : 1,email : 1,current_balance : -1});

let Accounts = mongoose.model("Accounts",AccountsSchema);

module.exports = Accounts;