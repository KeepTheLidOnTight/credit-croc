var express = require("express");

var router = express.Router();

// Import the model (account.js) to use its database functions.
var account = require("../models/account.js");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/home", function(req, res) {
    account.all(function(data) {
        var hbsObject = {
            accounts: data
        };
        console.log(hbsObject);
        res.render("home", hbsObject);
    });
});

router.put("/api/accounts/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    account.update({active: req.body.active}, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// leave this route at the end, redirects 404 error to index
router.get("*", function(req, res) {
    res.render("index");
});

// Borrowed from 13-17 cats app, todo: adapt this

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   cat.all(function(data) {
//     var hbsObject = {
//       cats: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/cats", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;