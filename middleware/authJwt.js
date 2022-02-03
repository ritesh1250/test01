const mysqlConnection = require("../connection");
const AuthorizationData = require("../utils/DetailsfromToken")

isAdmin =  (req, res, next) => {

  let userid=""

  AuthorizationData.DetailsfromToken(req.token, (err, data) => {
    if (err) {
      console.log(err)
    } else {
     userid = data.id;
     const getrole = 'SELECT a.role_id,b.role_name from users_auth a join users_role b on a.role_id=b.id WHERE user_id = ?'
     mysqlConnection.query(getrole, [userid], (err, result) => {
         if (err) {
           res.status(401).send({error:err});
         } else {
             for (let i = 0; i < result.length; i++) {
                 if (result[i].role_name === "Admin") {
                   next();
                   return;
                 }
                 else{
                  res.json({ message: "You are not Authorized" });
                 }
               }
         }
     });
     
    }
  });

};

isMeestAgent = (req, res, next) => {
  let userid=""
  AuthorizationData.DetailsfromToken(req.token, (err, data) => {
    if (err) {
      console.log(err)
    } else {
     userid = data.id;
     const getrole = 'SELECT a.role_id,b.role_name from users_auth a join users_role b on a.role_id=b.id WHERE user_id = ?'
     mysqlConnection.query(getrole, [userid], (err, result) => {
         if (err) {
           res.status(401).send({error:err});
         } else {
           console.log(result);
           next();
             for (let i = 0; i < result.length; i++) {
                 if (result[i].role_name === "Agent") {
                   next();
                   return true;
                 }
                 else{
                  res.json({ message: "You are not Authorized" });
                 }
               }
         }
     });
     
    }
  });
};


isMedlyAgent = (req, res, next) => {
  let userid=""
  AuthorizationData.DetailsfromToken(req.token, (err, data) => {
    if (err) {
      console.log(err)
    } else {
     userid = data.id;
     const getrole = 'SELECT a.role_id,b.role_name from users_auth a join users_role b on a.role_id=b.id WHERE user_id = ?'
     mysqlConnection.query(getrole, [userid], (err, result) => {
         if (err) {
           res.status(401).send({error:err});
         } else {
           console.log(result);
           next();
             for (let i = 0; i < result.length; i++) {
                 if (result[i].role_name === "Medly") {
                   next();
                   return;
                 }
                 else{
                  res.json({ message: "You are not Authorized" });
                 }
               }
         }
     });
     
    }
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  // verifyToken: verifyToken,
  isAdmin: isAdmin,
  isMeestAgent: isMeestAgent,
  isMedlyAgent: isMedlyAgent,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
