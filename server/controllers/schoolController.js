var mongoose = require("mongoose");
var School = require("../data/school");

var router = require("express").Router();
router.route('/s').get(getLanding);

function getLanding(req, res) {
    var assgmtID =  req.query.assignmentId;
    var hitID = req.query.hitId;
    var turkSubmitTo = req.query.turkSubmitTo;
    var workerId = req.query.workerId;

    var st = assgmtID + hitID + turkSubmitTo + workerId;
    res.json(st);
}

module.exports = router;