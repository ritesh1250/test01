const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken=require("./utils/verifyToken")
const { v1: uuidv1 } = require('uuid');
const moment = require('moment');
const { utc } = require("moment");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
jwtkey=")@345167";






app.post("/login", (req, res) => {
console.log(req.body);
  if(Object.keys(req.body).length === 0){
  res.status(400).send({ error: "Please Enter Userid And Password" });
  }
  else{
      if(Object.keys(req.body)[0]=='username' && Object.keys(req.body)[1]=='password'){
        const username = req.body.username.toString();
        let pass = req.body.password.toString();
      
        //uncomment the below line with required regex to verify password

        // var passw=  /^[A-Za-z]\w{3,14}$/;
      
       try{
      
        // if(pass.match(passw)){
      
        //// Checking if username and password exists in the database use of BINARY makes it case sensitive
              let sql = "SELECT * FROM users WHERE BINARY  username = ? AND BINARY  password = ?";

        //// Inserting the login details in loginhistory
              let loginhistory ="insert into loginhistory (userId,logindate,token) values ?"
              mysqlConnection.query(sql, [username, pass], (err, result) => {
                if (err) {
                  res.status(401).send({error:"Wrong username or password"});
                } else {
                  if (result.length === 1) {
                    let userid = result[0].id;
                    let FName = result[0].FName;
                    let LName = result[0].LName;
                    let username = result[0].username;
                    let useremail = result[0].email;
                    let usercreated_at = result[0].created_at;
                    let isDisabled = result[0].isDisabled;  

                    if(result[0].deleted.toString() !='1' && isDisabled != '1'){

                    //Second Layer check where user is login or not this can be removed
                      let checksession ="select * from loginhistory where userId=? and logoutdate is null order by logindate desc limit 1"
                    
                      mysqlConnection.query(checksession, [userid], (err, result) => {
                        if (err) console.log(err);
                        else {
                          if (result.length === 1) {
                            res.status(410).send({
                              error: "User is alredy logged in on different tab",
                              sessionid : result[0].token,
                              userId : result[0].userId
                            })

                          }
                          else{
                            const sessionid = uuidv1();
                              const currenttime = moment().utc().format();
                             
                          const updateLogin = "update users set isOnline = true,lastlogin = ? WHERE id = ?";
                          mysqlConnection.query(updateLogin, [currenttime, userid], (err, result) => {
                                if (err) console.log(err);
                                else {
                                  mysqlConnection.query(loginhistory, [[[userid,currenttime,sessionid]]], (err, result) => {
                                    if (err) console.log(err);
                                    else {
                                    }
                                  });
                                }
                              });
            
                          const rollquery = "SELECT * FROM users_auth WHERE user_id = ?";
                          mysqlConnection.query(rollquery, [userid], (err, roleresult) => {
                            if (err) {
                              console.log(err);
                            } else {
                             
                              let rollid = roleresult[0].role_id;
                              const defineroll = "SELECT * FROM users_role WHERE id = ?";
                              mysqlConnection.query(
                                defineroll,
                                [rollid],
                                (err, defineroleresult) => {
                                  if (err) {
                                    console.log(err);
                                  } else {
                                    let definerolename = defineroleresult[0].role_name;
                                         
                                    const token = jwt.sign(
                                      {
                                        id: userid,
                                        FName: FName,
                                        LName: LName,
                                        username: username,
                                        email: useremail,
                                        role_name: definerolename,
                                        isDisabled: isDisabled,
                                        usercreated_at:usercreated_at,
                                        sessionid:sessionid
                                      },
                                      ")@345167",
                                      {
                                        expiresIn: '15m'
                                      }
                                    );
                                    res.send(token);
                                  }
                                }
                              );
                            }
                          });
                          

                          }

                        }
                        
                      });



                    }


                    else{
                      res.status(404).send({ error: "Your ID is blocked. Kindly contact Administrator" })
                    }
                    
                  } 
                  else {
                    res.status(401).send({ error: "Please Enter the Valid Username or Password" });
                  }
                }
              });
           
            // }
            // else{
            //   res.json({meassage:"Please Enter the Valid Password"});
            // }
      
          }

        catch (error){
          console.log(error);
            res.status(400).send({ error: "Something Went Wrong" });
          }
      
      }
      else{
        res.status(401).send({ error: "Username or password missing" });
      }

    }
});

app.post("/logout", (req, res) => {
  let userid=req.body.userid; 
  let sessionid=req.body.sessionid;

        //  userid=authData.id;
          try{
      
            let sql = "SELECT * FROM users WHERE id = ?";
            let loginhistory ="update loginhistory set logoutdate =? where token = ?"
            const currenttime = moment().utc().format();
            // const currenttime = new Date();
            mysqlConnection.query(sql, [userid], (err, result) => {
              if (err) {
                res.status(401).send({error:"Wrong userid"});
              } else {
                if (result.length === 1) {
                  
                  const updateLogin = "update users set isOnline =false WHERE id = ?";
                  mysqlConnection.query(updateLogin, [userid], (err, result) => {
                        if (err) console.log(err);
                        else {
                          
                          mysqlConnection.query(loginhistory, [currenttime,sessionid], (err, result) => {
                            if (err) console.log(err);
                            else {
                              //console.log(result);
                              res.status(200).send({ code:'200',msg: "User Logout" });
                            }
                          });
                            
                        }
                      });   
                } else {
                  res.status(401).send({ error: "Wrong userid" });
                }
              }
            });  
        }
        catch{
          res.status(400).send({ error: "Something Went Wrong" });
        }
        
      });

app.post("/verifyToken",(req, res) => {
  let userid="";
  const bearerHeader=req.body.headers['Authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')
    req.token=bearer[1]

    jwt.verify(req.token,jwtkey,(err,authData)=> {
      if(err){
        //console.log(err);
        res.status(200).send({code:'500'})
      }else{
        res.status(200).send({code:'200'})
      }
    })
  }else{
    res.status(401).send({"result":"Token not provided"})
  }
});


exports.app = app;
