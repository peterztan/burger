var connection = require("./connection.js");

// Helper function for SQL syntax.
// var's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// ⇣ Helper function below ⇣
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM ??;";
    connection.query(queryString, table, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result); // execute callback function
    });
  },

  insertOne: function(table, col, val, cb) {
    var queryString = "INSERT INTO ?? (??) VALUES (?);";
    connection.query(queryString, [table, col, val], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result); // execute callback function
    });
  },

  updateOne: function(table, col, val, state, cb) {
    var queryString = `UPDATE ?? SET ??=? WHERE ${state};`;
    connection.query(queryString, [table, col, val], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
