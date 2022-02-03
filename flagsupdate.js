const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/updateflags", (req, res) => {
  //For demo
  const rolename = req.body.rolename;
  //const token = req.body.token;    //original coding...
  //const rolename = token.role_name;
  if(rolename === 'moderator')
  {
  
    let postid = req.body.post_id;
  const flagname = req.body.flag_name;
  const currenttime = new Date();

  const fcreateTimeUpdate = "UPDATE flags SET created_at = ? WHERE flag_name = ?";
  mysqlConnection.query(fcreateTimeUpdate, [currenttime, flagname], (err, result)=>
  {
      if(err) res.json({message:err});
      else{
          //("Flag Created TIme is updated");
      }

  });

  const findflagid = "SELECT id FROM flags WHERE flag_name = ?";
  mysqlConnection.query(findflagid, [flagname], (err, result) => {
    if (err) console.log(err);
    else {
      let flagid = result[0].id;

      const sql = "UPDATE posts SET flag_id = ? WHERE post_id = ?";
      mysqlConnection.query(sql, [flagid, postid], (req, sqlresult) => {
        if (err) res.json({message:err});
        else {
          res.json({message:"Flag id Updated Successfully in Posts Table"});
        }
      });
    }
  });
}
});

exports.app = app;
