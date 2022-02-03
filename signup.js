const express = require("express");
const bodyParser = require("body-parser");
const jsonParser=bodyParser.json();
const verifyToken=require("./utils/verifyToken")
const mysqlConnection = require("./connection");
jwtkey=")@345167";
const jwt = require("jsonwebtoken");
const DetailsfromToken = require("./utils/DetailsfromToken");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const userfinder = "SELECT * FROM users WHERE username = ?";

app.post("/useravailability",(req,res) =>{
  const username = req.body.username;
  if(username=="" || username==null ){
    res.status(204).json({err:"Username Blank"});
  }
  else{
 
  mysqlConnection.query(userfinder, [username], (err, userResult) => {
    if (err) {
      res.status(204).json({err:"Something Went Wrong"});
    }
    else if (userResult.length < 1) {
      res.status(200).json({msg:"Username available"});
    }
    else{
      res.status(205).json({err:"Username Exist Already"}); 
    }

  })
  
}

},

app.post("/signup",verifyToken, (req, res) => {

  const bearerHeader=req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token=bearer[1];
  jwt.verify(req.token,jwtkey,(err,authData)=> {
    if(err){
      res.json({result:err})
    }else{
      rolename = authData.role_name;
      userid=authData.id;
    }
  })

  if(Object.keys(req.body).length === 0)
 {
  res.status(400).send("Request Body is missing"); 
  }
  else{
    if(Object.keys(req.body)[0]=='firstName' && Object.keys(req.body)[1]=='lastName' && Object.keys(req.body)[2]=='username' && Object.keys(req.body)[3]=='email' && Object.keys(req.body)[4]=='password'  && Object.keys(req.body)[5]=='role_name'){
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const username = req.body.username;
      const useremail = req.body.email;
      const userpass = req.body.password;
      const role=req.body.role_name;
      if (rolename === 'Admin')
     {
         
  mysqlConnection.query(userfinder, [username], (err, userResult) => {
    if (err) {
      console.log(err);
    } else {
      if (userResult.length < 1) {
        const sql =
          "INSERT INTO users (FName,LName,username, email, password,isDisabled,isOnline ) VALUES ?";
        let uservalues = [[firstName,lastName,username, useremail, userpass,'0','0']];
        mysqlConnection.query(sql, [uservalues], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            //console.log("User added Successfully!");
              //// Getting the id of the new User on the basis of username
        const findId = "SELECT id FROM users WHERE username = ?";
        const findRoleId = "SELECT id FROM users_role WHERE role_name = ?";
       
        var roleid = "";
            
    //// Deciding Roll Id on the basis of role name.
        mysqlConnection.query(findRoleId, role, (err, roleResult) => {
          if (err) {
            console.log(err);
          } else {
            console.log(roleResult);
            roleid=roleResult[0].id;
            //// Updating the users_auth table for new User.       
        mysqlConnection.query(findId, [username], (err, idResult) => {
          if (err) {
            console.log(err);
          } else {
           
            let userid = idResult[0].id;
            const updateusers_auth =
              "INSERT INTO users_auth (user_id, role_id) VALUES ?";
            let values = [[userid, roleid]];

            mysqlConnection.query(
              updateusers_auth,
              [values],
              (err, usersauthResult) => {
                if (err) {
                  console.log(err);
                } 
                else {
                  res.json({
                    message:"User Registered Successfully"});
                }
              }
            );
          }
        });
          }
        });

          }
        });


      

   
      } 
      else {
        res.status(204).send({message:"User Exist Already"});
      }
    }
  });

     }
     else{
      res.status(400).json({message: "You are not Authorized" });
     }
    }
    else{
      res.status(400).json({message:"No Correct Data"});
    }

  }

}));


exports.app = app;
