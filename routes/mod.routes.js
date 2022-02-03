module.exports = app => {
    const verifyToken = require('../utils/verifyToken')
    const mod = require("../controllers/mod.controller");
    const { authJwt } = require("../middleware");

  
    
    app.get("/getmod",verifyToken,[authJwt.isAdmin],mod.getmod);


   
  
    
  };
  