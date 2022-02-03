const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const jsonParser=bodyParser.json();
const mysqlConnection = require("../connection");
jwtkey=")@345167";

function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ')
      req.token=bearer[1]
  
      jwt.verify(req.token,jwtkey,(err,authData)=> {
        if(err){
          //From ;
          res.status(450).send({result:err})
        }else{
          const userid = authData.id;
          const sessionid = authData.sessionid;
          const checksession ="select * from loginhistory where userId=? and logoutdate is null order by logindate desc limit 1"
                    
          mysqlConnection.query(checksession, [userid] ,(err, checksessionresult) => {
            if (err) console.log(err);
            else {
              //To Check wheather the mod is login somewhere or not.
              if(checksessionresult.length>0){
                if(checksessionresult[0].token == sessionid ){
                  next();
                }
                else{
                  res.status(460).send({err:"You are login somewhere else"})
                }

              }
              else
              {
                res.status(480).send({err:"You are Disabled"})
              }
             
    
            }
          
          })
         
        }
      })
    }else{
      res.send({"result":"Token not provided"})
    }
  } 
  module.exports = verifyToken;