const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('./connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/moddata', (req, res) => {
  //For demo
  const rolename = req.body.rolename;
  //const token = req.body.token;    //original coding...
  //const rolename = token.role_name;
  if (rolename === 'admin') {
    const sql =
      " SELECT name, username, email, password, ismod_enable, ismod_online FROM users WHERE id IN (SELECT users_id FROM users_auth WHERE role_id = '2') ";
    mysqlConnection.query(sql, (err, result) => {
      if (err) console.log(err);
      else {
        res.json({ result: result });
      }
    });
  }
});

app.post('/updatemoderator', (req, res) => {
  //For demo
  const rolename = req.body.rolename;
  //const token = req.body.token;    //original coding...
  //const rolename = token.role_name;
  if (rolename === 'admin') {
    const modid = req.body.id;
    const modusername = req.body.username;
    const moderatorname = req.body.name;
    const moderatoremail = req.body.email;
    const moderatorpass = password;

    const sql =
      'UPDATE users SET username = ?, name = ?, email = ?, password = ? WHERE id = ?';
    mysqlConnection.query(
      sql,
      [modusername, moderatorname, moderatoremail, moderatorpass, modid],
      (err, result) => {
        if (err) console.log(err);
        else {
          res.json({ message: 'Update Successfully' });
        }
      }
    );
  } else {
    res.json({
      message: 'Not authorized!',
    });
  }
});

exports.app = app;
