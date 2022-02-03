const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
jwtkey=")@345167";

function checkRole(token){
      jwt.verify(token,jwtkey,(err,authData)=> {
        if(err){
          res.json({result:err})
        }else{
         
            

        }
      })
  } 

  module.exports = checkRole;