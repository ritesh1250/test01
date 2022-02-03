const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//

app.post("/particularpost", (req, res) =>{

  //For demo
  const rolename = req.body.rolename;
  //const token = req.body.token;    //original coding...
  //const rolename = token.role_name;
  if(rolename === 'moderator')
  {

    let postid = req.body.post_id;
    const sql = "SELECT user_id, post_url FROM posts WHERE status = 'null' AND post_id = ?" ;
    mysqlConnection.query(sql, [postid], (err, result) =>{
        if(err) console.log(err);
        else {
              if(result.length === 1)
              {
                  //console.log(result);
                let userid = result[0].user_id;
                let posturl = result[0].post_url;
                //console.log(userid, posturl);// I have to send this data to the frontend
                const resultt = [userid, posturl];
                res.json({
                  user_id:userid,
                post_url: posturl
              })
              }
              else{
                    res.json({message:"No such post exist!"});
              }
               
            }
    });
  }

});

exports.app = app;