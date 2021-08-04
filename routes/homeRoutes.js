let express = require('express');
let router = express.Router();
let Accounts = require('../models/accountModel');

router.get("/", async (req, res) => {

    if (req.session.user_id != null) {
        let record = await Accounts.findOne({ _id: req.session.user_id });
        res.render("home", { id: req.session.user_id, record: record });
    }
    else {
        res.render("home", { id: req.session.user_id });
    }

});

module.exports = router;