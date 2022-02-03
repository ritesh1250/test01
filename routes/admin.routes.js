module.exports = app => {
    const verifyToken = require('../utils/verifyToken')
    const admin = require("../controllers/admin.controller");
    const { authJwt } = require("../middleware");

  
    
    app.get("/getadminmeestdashdata",verifyToken,[authJwt.isAdmin],admin.getadminmeestdashdata);


    app.get("/getadminmedleydashdata",verifyToken,[authJwt.isAdmin],admin.getadminmedleydashdata);
    

    app.get("/getadminChartdata",verifyToken,[authJwt.isAdmin],admin.getadminChartdata);


    app.post("/EDmodservice",verifyToken,[authJwt.isAdmin],admin.EDmodservice);

    
    app.post("/deletemod",verifyToken,[authJwt.isAdmin],admin.deletemod);


    app.get("/lastdayposts",verifyToken,[authJwt.isAdmin],admin.lastdayposts);

    
    app.get("/lastweekposts",verifyToken,[authJwt.isAdmin],admin.lastweekposts);


    app.get("/holdedpost",verifyToken,[authJwt.isAdmin],admin.holdedpost);


    app.get("/rejectedpost",verifyToken,[authJwt.isAdmin],admin.rejectedpost);


    app.get("/holdedmedlypost",verifyToken,[authJwt.isAdmin],admin.holdedmedlypost);


    app.get("/rejectedmedlypost",verifyToken,[authJwt.isAdmin],admin.rejectedmedlypost);


    app.get("/getalluserdata",verifyToken,[authJwt.isAdmin],admin.getalluserdata);


    app.post("/getagentdatabyid",verifyToken,[authJwt.isAdmin],admin.getagentdatabyid);


    app.post("/editmod",verifyToken,[authJwt.isAdmin],admin.editmod);

  
    
  };
  