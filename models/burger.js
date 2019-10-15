orm = require("../config/orm.js");
mysql = require("mysql");

var burger = {
  all: function(cb) {
    orm.selectAll("burgers", cb);
  },
  create: function(col, val, cb) {
    orm.insertOne("burgers", col, val, cb);
  },
  update: function(col, val, state, cb) {
    orm.updateOne("burgers", col, val, state, cb);
  }
};

module.exports = burger;
