var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    res.render("index", { burgers: data });
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create("burger_name", req.body.name, function(result) {
    res.redirect("back");
  });
});

router.put("/api/burgers/:id", function(req, res) {
  burger.update("devoured", true, `id=${req.params.id}`, function(result) {
    res.redirect("back");
  });
});

module.exports = router;
