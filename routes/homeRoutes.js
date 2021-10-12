let express = require('express');
let router = express.Router();
let Accounts = require('../models/accountModel');

router.get("/", async (req, res) => {

    if (req.session.user_id != null) {
        let record = await Accounts.findOne({ _id: req.session.user_id });
        res.render("home", { id: req.session.user_id, record: record });
    }
    else {
        res.render("home", { id: req.session.user_id, record : null });
    }

});

router.get('/transaction', (req,res)=> {
    
    res.redirect('/account/transaction');
});

router.get('/create_acc', (req,res)=> {
    
    res.redirect('/account/create_acc');
});

router.get('/personaldetails', (req,res)=> {
    
    res.redirect('/account/personaldetails');
});

router.get('/view', (req,res)=> {
    
    res.redirect('/account/view');
});

module.exports = router;