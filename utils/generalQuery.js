const mysqlConnection = require("../connection");

//const postallocation = "SELECT id FROM posts WHERE id NOT IN (SELECT post_id FROM posts_allocation) ORDER BY created_at DESC LIMIT 2";

const generalQuery = function(query,callback) {
    mysqlConnection.query(query, (err, results) => {
      if (err)
        {callback(err)}
      else {
        callback(results);
      }
    });
  }
  module.exports = generalQuery;