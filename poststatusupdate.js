const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const verifyToken = require("./utils/verifyToken");
const jwt = require("jsonwebtoken");
jwtkey=")@345167";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/approvepost",verifyToken, (req, res) => {
  let rolename="";
  let userid="";
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
    res.status(401)
     res.json({
       message:"Request Body is missing"});
   }
   else{
    if(Object.keys(req.body)[0]=='post_id' && Object.keys(req.body)[1]=='status'){
      
      const postid = req.body.post_id.toString();
      const poststatus = req.body.status.toString();

      if (rolename === 'Agent')
      {
        if (poststatus==1){
          const topicdata = req.body.topicData;
          const currenttime = new Date();
          if(topicdata==null || topicdata==''){
            const updatestatus =
            "UPDATE posts_cms SET status = ? WHERE myautoid = ?";
          const updatetime =
            "UPDATE posts_allocation set moderated_at = ? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [poststatus,postid], (err, result) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(updatetime, [currenttime, postid], (err, result1) => {
                if (err) console.log(err);
                else {
                 // console.log(result1)
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
                }
              });
             // res.json({message:"Status updated successfuly"});
            }
            
          });
          }
          else{
            //cosnole.log(topicdata);
            const updatestatus =
            "UPDATE posts_cms SET status = ?,topicId =? WHERE myautoid = ?";
          const updatetime =
            "UPDATE posts_allocation set moderated_at = ? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),postid], (err, result) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(updatetime, [currenttime, postid], (err, result) => {
                if (err) console.log(err);
                else {
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
                }
              });
             // res.json({message:"Status updated successfuly"});
            }
            
          });
            
          }
          }
          else if(poststatus==0){
          const comment = req.body.comment.toString();
          const flagData = req.body.flagData.toString();
          console.log(flagData);
          const topicdata = req.body.topicData;
          const currenttime = new Date();
          if(topicdata===null || topicdata==''){
            const updatestatus =
            "UPDATE posts_cms SET status = ?, flag_id=? WHERE myautoid = ?";
          const updatetime =
            "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [poststatus,flagData,postid], (err, result) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
                if (err) console.log(err);
                else {
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
                }
              });
             // res.json({message:"Status updated successfuly"});
            }
            
          });
          }
          else{
            //cosnole.log(topicdata);
            const updatestatus =
            "UPDATE posts_cms SET status = ?,topicId =?,flag_id=? WHERE myautoid = ?";
          const updatetime =
            "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),flagData,postid], (err, result) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
                if (err) console.log(err);
                else {
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
                }
              });
             // res.json({message:"Status updated successfuly"});
            }
            
          });
            
          }
          
    
          }
          else if(poststatus=='H'){
          //console.log(req.body);
          const comment = req.body.comment.toString();
          const flagData = req.body.flagData.toString(); 
          const topicdata = req.body.topicData;
          const currenttime = new Date();
          if(topicdata==null || topicdata==''){
            const updatestatus =
            "UPDATE posts_cms SET status = ?, allocation_status = ?, flag_id=? WHERE myautoid = ?";
          const updatetime =
            "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [0,poststatus,flagData,postid], (err, result) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
                if (err) console.log(err);
                else {
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
                }
              });
             // res.json({message:"Status updated successfuly"});
            }
            
          });
          }
          else{
            const updatestatus =
            "UPDATE posts_cms SET status = ?,allocation_status = ?,topicId =?,flag_id=? WHERE myautoid = ?";
          const updatetime =
            "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [0,poststatus,topicdata.toString(),flagData,postid], (err, result) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
                if (err) console.log(err);
                else {
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
                }
              });
             // res.json({message:"Status updated successfuly"});
            }
            
          });
            
          }
          
    
          
    
          }
          else{
            res.json("No Correct Data")
          }

      }
      else if (rolename === 'Medly')
  {
    if (poststatus==1){
      const topicdata = req.body.topicData;
      const currenttime = new Date();
      if(topicdata==null || topicdata==''){
        const updatestatus =
        "UPDATE medly_post SET status = ? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ? WHERE medly_postid = ?";
      mysqlConnection.query(updatestatus, [poststatus,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime, postid], (err, result1) => {
            if (err) console.log(err);
            else {
             // console.log(result1)
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
        
        }
        
      });
      }
      else{
        //cosnole.log(topicdata);
        const updatestatus =
        "UPDATE medly_post SET status = ?,topicId =? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ? WHERE medly_postid = ?";
      mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
        
      }
      }
      else if(poststatus==0){
        console.log(req.body);
      const comment = req.body.comment.toString();
      const flagData = req.body.flagData.toString();
      const topicdata = req.body.topicData;
      const currenttime = new Date();
      if(topicdata===null || topicdata==''){
        const updatestatus =
        "UPDATE medly_post SET status = ?, flag_id=? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE medly_postid = ?";
      mysqlConnection.query(updatestatus, [poststatus,flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
      }
      else{
        
        const updatestatus =
        "UPDATE medly_post SET status = ?,topicId =?,flag_id=? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE medly_postid = ?";
      mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
        
      }
      

      }
      else if(poststatus=='H'){
      const comment = req.body.comment.toString();
      const flagData = req.body.flagData.toString(); 
      const topicdata = req.body.topicData;
      const currenttime = new Date();
      if(topicdata==null || topicdata==''){
        const updatestatus =
        "UPDATE medly_post SET status =?, allocation_status = ?, flag_id=? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE medly_postid = ?";
      mysqlConnection.query(updatestatus, [0,poststatus,flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
      }
      else{
        const updatestatus =
        "UPDATE medly_post SET status =?, allocation_status = ?,topicId =?,flag_id=? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE medly_postid = ?";
      mysqlConnection.query(updatestatus, [0,poststatus,topicdata.toString(),flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
        
      }
      }
      else{
        res.json("No Correct Data")
      }
  }
      else {
        res.json({ message: "You are not Authorized" });
      }

    }




    else
    {
      res.status(400);
      res.json({meassage:"post_id or status missing"});
    }
  
}
});

app.post("/adminapprovemeestpost",verifyToken, (req, res) => {
  let rolename="";
  let userid="";
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
    res.status(401)
     res.json({
       message:"Request Body is missing"});
   }
   else{
    if(Object.keys(req.body)[0]=='post_id' && Object.keys(req.body)[1]=='status'){
      
      const postid = req.body.post_id.toString();
      const poststatus = req.body.status.toString();

      if (rolename === 'Admin')
      {
        if (poststatus==1){
          const comment = req.body.comment.toString();
          // const topicdata = req.body.topicData;
          const currenttime = new Date();
          // if(topicdata==null || topicdata==''){
            const updatestatus =
            "UPDATE posts_cms SET allocation_status='Y',status = ?,holdcaseapprovedate=?, holdcaseapproveby =?,adminComment=? WHERE myautoid = ?";
          mysqlConnection.query(updatestatus, [poststatus,currenttime,userid,comment,postid], (err, result) => {
            if (err) console.log(err);
            else {
                  
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
             
            }
            
          });
          // }
          // else{
          //   //cosnole.log(topicdata);
          //   const updatestatus =
          //   "UPDATE posts_cms SET allocation_status='Y',holdcaseapprovedate=?,holdcaseapproveby =? ,status = ?,topicId =? WHERE myautoid = ?";
        
          //   mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,topicdata.toString(),postid], (err, result) => {
          //   if (err) console.log(err);
          //   else {
            
          //         res.status(200)
          //         res.json({message:"Status updated successfuly"});
          //    // res.json({message:"Status updated successfuly"});
          //   }
            
          // });
            
          // }
          }
          else if(poststatus==0){
          const comment = req.body.comment.toString();
          // const flagData = req.body.flagData.toString();
          // console.log(flagData);
          // const topicdata = req.body.topicData;
           const currenttime = new Date();
          // if(topicdata===null || topicdata==''){
          //   const updatestatus =
          //   "UPDATE posts_cms SET allocation_status='Y',holdcaseapprovedate=?, holdcaseapproveby =? ,status = ?, flag_id=? WHERE myautoid = ?";
          //  mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,flagData,postid], (err, result) => {
          //   if (err) console.log(err);
          //   else {
            
          //         res.status(200)
          //         res.json({message:"Status updated successfuly"});
            
          //    // res.json({message:"Status updated successfuly"});
          //   }
            
          // });
          // }
          // else{
            //cosnole.log(topicdata);
            const updatestatus =
            "UPDATE posts_cms SET allocation_status='Y',holdcaseapprovedate=?, holdcaseapproveby =? ,status = ?,adminComment=? WHERE myautoid = ?";
           mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,comment,postid], (err, result) => {
            if (err) console.log(err);
            else {
            
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
           
             // res.json({message:"Status updated successfuly"});
            }
            
          });
            
          // }
          
    
          }
          else{
            res.json("No Correct Data")
          }

      }
      else {
        res.json({ message: "You are not Authorized" });
      }

    }




    else
    {
      res.status(400);
      res.json({meassage:"post_id or status missing"});
    }
  
}
});


app.post("/adminapprovemedlypost",verifyToken, (req, res) => {
  let rolename="";
  let userid="";
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
    res.status(401)
     res.json({
       message:"Request Body is missing"});
   }
   else{
    if(Object.keys(req.body)[0]=='post_id' && Object.keys(req.body)[1]=='status'){
      
      const postid = req.body.post_id.toString();
      const poststatus = req.body.status.toString();

      if (rolename === 'Admin')
      {
        if (poststatus==1){
          const comment = req.body.comment.toString();
          // const topicdata = req.body.topicData;
          const currenttime = new Date();
          // if(topicdata==null || topicdata==''){
            const updatestatus =
            "UPDATE medly_post SET allocation_status='Y',status = ?,holdcaseapprovedate=?, holdcaseapproveby =?,adminComment=? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [poststatus,currenttime,userid,comment,postid], (err, result) => {
            if (err) console.log(err);
            else {
                  
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
             
            }
            
          });
          // }
          // else{
          //   //cosnole.log(topicdata);
          //   const updatestatus =
          //   "UPDATE medly_post SET holdcaseapprovedate=?,holdcaseapproveby =? ,status = ?,topicId =? WHERE post_id = ?";
        
          //   mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,topicdata.toString(),postid], (err, result) => {
          //   if (err) console.log(err);
          //   else {
            
          //         res.status(200)
          //         res.json({message:"Status updated successfuly"});
          //    // res.json({message:"Status updated successfuly"});
          //   }
            
          // });
            
          // }
          }
          else if(poststatus==0){
          const comment = req.body.comment.toString();
          // const flagData = req.body.flagData.toString();
          // console.log(flagData);
          // const topicdata = req.body.topicData;
          const currenttime = new Date();
          // if(topicdata===null || topicdata==''){
          //   const updatestatus =
          //   "UPDATE medly_post SET holdcaseapprovedate=?, holdcaseapproveby =? ,status = ?, flag_id=? WHERE post_id = ?";
          //  mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,flagData,postid], (err, result) => {
          //   if (err) console.log(err);
          //   else {
            
          //         res.status(200)
          //         res.json({message:"Status updated successfuly"});
            
          //    // res.json({message:"Status updated successfuly"});
          //   }
            
          // });
          // }
          // else{
            //cosnole.log(topicdata);
            const updatestatus =
            "UPDATE medly_post SET allocation_status='Y',holdcaseapprovedate=?, holdcaseapproveby =? ,status = ?,adminComment=? WHERE post_id = ?";
           mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,comment,postid], (err, result) => {
            if (err) console.log(err);
            else {
            
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
           
             // res.json({message:"Status updated successfuly"});
            }
            
          });
            
          // }
          
    
          }
          else{
            res.json("No Correct Data")
          }

      }
      else {
        res.json({ message: "You are not Authorized" });
      }

    }




    else
    {
      res.status(400);
      res.json({meassage:"post_id or status missing"});
    }
  
}
});


app.post("/adminapproverejectmedlypost",verifyToken, (req, res) => {
  let rolename="";
  let userid="";
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
    res.status(401)
     res.json({
       message:"Request Body is missing"});
   }
   else{
    if(Object.keys(req.body)[0]=='post_id' && Object.keys(req.body)[1]=='status'){
      
      const postid = req.body.post_id.toString();
      const poststatus = req.body.status.toString();

      if (rolename === 'Admin')
      {
        if (poststatus==1){
          // const comment = req.body.comment.toString();
          // const topicdata = req.body.topicData;
          const currenttime = new Date();
          // if(topicdata==null || topicdata==''){
            const updatestatus =
            "UPDATE medly_post SET allocation_status='Y',status = ?,holdcaseapprovedate=?, holdcaseapproveby =? WHERE post_id = ?";
          mysqlConnection.query(updatestatus, [poststatus,currenttime,userid,postid], (err, result) => {
            if (err) console.log(err);
            else {
                  
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
             
            }
            
          });
          // }
          // else{
          //   //cosnole.log(topicdata);
          //   const updatestatus =
          //   "UPDATE medly_post SET holdcaseapprovedate=?,holdcaseapproveby =? ,status = ?,topicId =? WHERE post_id = ?";
        
          //   mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,topicdata.toString(),postid], (err, result) => {
          //   if (err) console.log(err);
          //   else {
            
          //         res.status(200)
          //         res.json({message:"Status updated successfuly"});
          //    // res.json({message:"Status updated successfuly"});
          //   }
            
          // });
            
          // }
          }
          else if(poststatus==0){
          // const comment = req.body.comment.toString();
          const currenttime = new Date();
            const updatestatus =
            "UPDATE medly_post SET allocation_status='Y',holdcaseapprovedate=?, holdcaseapproveby =? ,status = ? WHERE post_id = ?";
           mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,postid], (err, result) => {
            if (err) console.log(err);
            else {
            
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
           
             // res.json({message:"Status updated successfuly"});
            }
            
          });
            
          // }
          
    
          }
          else{
            res.json("No Correct Data")
          }

      }
      else {
        res.json({ message: "You are not Authorized" });
      }

    }




    else
    {
      res.status(400);
      res.json({meassage:"post_id or status missing"});
    }
  
}
});

app.post("/adminapproverejectmeestpost",verifyToken, (req, res) => {

  let rolename="";
  let userid="";
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
    res.status(401)
     res.json({
       message:"Request Body is missing"});
   }
   else{
    if(Object.keys(req.body)[0]=='post_id' && Object.keys(req.body)[1]=='status'){
      
      
      const postid = req.body.post_id.toString();
      const poststatus = req.body.status.toString();

      if (rolename === 'Admin')
      {
        if (poststatus==1){
          // const comment = req.body.comment.toString();
          // const topicdata = req.body.topicData;
          const currenttime = new Date();
          // if(topicdata==null || topicdata==''){
            const updatestatus =
            "UPDATE posts_cms SET allocation_status='Y',status = ?,holdcaseapprovedate=?, holdcaseapproveby =? WHERE myautoid = ?";
            mysqlConnection.query(updatestatus, [poststatus,currenttime,userid,postid], (err, result) => {
            if (err) console.log(err);
            else {
                  
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
             
            }
            
          });
          // }
          // else{
          //   //cosnole.log(topicdata);
          //   const updatestatus =
          //   "UPDATE medly_post SET holdcaseapprovedate=?,holdcaseapproveby =? ,status = ?,topicId =? WHERE post_id = ?";
        
          //   mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,topicdata.toString(),postid], (err, result) => {
          //   if (err) console.log(err);
          //   else {
            
          //         res.status(200)
          //         res.json({message:"Status updated successfuly"});
          //    // res.json({message:"Status updated successfuly"});
          //   }
            
          // });
            
          // }
          }
          else if(poststatus==0){
          const comment = req.body.comment.toString();
          // const flagData = req.body.flagData.toString();
          // console.log(flagData);
          // const topicdata = req.body.topicData;
          const currenttime = new Date();
          // if(topicdata===null || topicdata==''){
          //   const updatestatus =
          //   "UPDATE medly_post SET holdcaseapprovedate=?, holdcaseapproveby =? ,status = ?, flag_id=? WHERE post_id = ?";
          //  mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,flagData,postid], (err, result) => {
          //   if (err) console.log(err);
          //   else {
            
          //         res.status(200)
          //         res.json({message:"Status updated successfuly"});
            
          //    // res.json({message:"Status updated successfuly"});
          //   }
            
          // });
          // }
          // else{
            //cosnole.log(topicdata);
            const updatestatus =
            "UPDATE medly_post SET allocation_status='Y',holdcaseapprovedate=?, holdcaseapproveby =? ,status = ?,adminComment=? WHERE post_id = ?";
           mysqlConnection.query(updatestatus, [currenttime,userid,poststatus,comment,postid], (err, result) => {
            if (err) console.log(err);
            else {
            
                  res.status(200)
                  res.json({message:"Status updated successfuly"});
           
             // res.json({message:"Status updated successfuly"});
            }
            
          });
            
          // }
          
    
          }
          else{
            res.json("No Correct Data")
          }

      }
      else {
        res.json({ message: "You are not Authorized" });
      }

    }




    else
    {
      res.status(400);
      res.json({meassage:"post_id or status missing"});
    }
  
}
});


// app.post("/adminapprovemedlypost",verifyToken, (req, res) => {
//   let rolename="";
//   let userid="";
//   const bearerHeader=req.headers['authorization'];
//   const bearer = bearerHeader.split(' ');
//   req.token=bearer[1];
//   jwt.verify(req.token,jwtkey,(err,authData)=> {
//     if(err){
//       res.json({result:err})
//     }else{
//       rolename = authData.role_name;
//       userid=authData.id;
//     }
//   })

//   if(Object.keys(req.body).length === 0)
//   {
//     res.status(401)
//      res.json({
//        message:"Request Body is missing"});
//    }
//    else{
//     if(Object.keys(req.body)[0]=='post_id' && Object.keys(req.body)[1]=='status'){
      
//       const postid = req.body.post_id.toString();
//       const poststatus = req.body.status.toString();

//       if (rolename === 'Admin')
//       {
//         if (poststatus==1){
//           const topicdata = req.body.topicData;
//           const currenttime = new Date();
//           if(topicdata==null || topicdata==''){
//             const updatestatus =
//             "UPDATE medly_post SET status = ? WHERE post_id = ?";
//           const updatetime =
//             "UPDATE posts_allocation set moderated_at = ? WHERE medly_post = ?";
//           mysqlConnection.query(updatestatus, [poststatus,postid], (err, result) => {
//             if (err) console.log(err);
//             else {
//               mysqlConnection.query(updatetime, [currenttime, postid], (err, result1) => {
//                 if (err) console.log(err);
//                 else {
//                   console.log(result1)
//                   res.status(200)
//                   res.json({message:"Status updated successfuly"});
//                 }
//               });
//              // res.json({message:"Status updated successfuly"});
//             }
            
//           });
//           }
//           else{
//             //cosnole.log(topicdata);
//             const updatestatus =
//             "UPDATE medly_post SET status = ?,topicId =? WHERE post_id = ?";
//           const updatetime =
//             "UPDATE posts_allocation set moderated_at = ? WHERE medly_post = ?";
//           mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),postid], (err, result) => {
//             if (err) console.log(err);
//             else {
//               mysqlConnection.query(updatetime, [currenttime, postid], (err, result) => {
//                 if (err) console.log(err);
//                 else {
//                   res.status(200)
//                   res.json({message:"Status updated successfuly"});
//                 }
//               });
//              // res.json({message:"Status updated successfuly"});
//             }
            
//           });
            
//           }
//           }
//           else if(poststatus==0){
//           const comment = req.body.comment.toString();
//           const flagData = req.body.flagData.toString();
//           console.log(flagData);
//           const topicdata = req.body.topicData;
//           const currenttime = new Date();
//           if(topicdata===null || topicdata==''){
//             const updatestatus =
//             "UPDATE medly_post SET status = ?, flag_id=? WHERE post_id = ?";
//           const updatetime =
//             "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE medly_post = ?";
//           mysqlConnection.query(updatestatus, [poststatus,flagData,postid], (err, result) => {
//             if (err) console.log(err);
//             else {
//               mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
//                 if (err) console.log(err);
//                 else {
//                   res.status(200)
//                   res.json({message:"Status updated successfuly"});
//                 }
//               });
//              // res.json({message:"Status updated successfuly"});
//             }
            
//           });
//           }
//           else{
//             //cosnole.log(topicdata);
//             const updatestatus =
//             "UPDATE medly_post SET status = ?,topicId =?,flag_id=? WHERE post_id = ?";
//           const updatetime =
//             "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE medly_post = ?";
//           mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),flagData,postid], (err, result) => {
//             if (err) console.log(err);
//             else {
//               mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
//                 if (err) console.log(err);
//                 else {
//                   res.status(200)
//                   res.json({message:"Status updated successfuly"});
//                 }
//               });
//              // res.json({message:"Status updated successfuly"});
//             }
            
//           });
            
//           }
          
    
//           }
//           else{
//             res.json("No Correct Data")
//           }

//       }
//       else {
//         res.json({ message: "You are not Authorized" });
//       }

//     }




//     else
//     {
//       res.status(400);
//       res.json({meassage:"post_id or status missing"});
//     }
  
// }
// });


app.post("/approvemedlypost",verifyToken, (req, res) => {

  if(Object.keys(req.body).length === 0)
  {
    res.status(401)
     res.json({
       message:"Request Body is missing"});
   }
   else{
    if(Object.keys(req.body)[0]=='post_id' && Object.keys(req.body)[1]=='status'){
      
      const postid = req.body.post_id.toString();
      const poststatus = req.body.status.toString();
      if (poststatus==1){
      const topicdata = req.body.topicData;
      const currenttime = new Date();
      if(topicdata==null || topicdata==''){
        const updatestatus =
        "UPDATE medly_post SET status = ? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ? WHERE medly_post = ?";
      mysqlConnection.query(updatestatus, [poststatus,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime, postid], (err, result1) => {
            if (err) console.log(err);
            else {
              console.log(result1)
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
      }
      else{
        //cosnole.log(topicdata);
        const updatestatus =
        "UPDATE medly_post SET status = ?,topicId =? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ? WHERE medly_post = ?";
      mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
        
      }
      }
      else if(poststatus==0){
      const comment = req.body.comment.toString();
      const flagData = req.body.status;
      const topicdata = req.body.topicData.toString();
      const currenttime = new Date();
      if(topicdata===null || topicdata==''){
        const updatestatus =
        "UPDATE posts_cms SET status = ?, flag_id=? WHERE post_id = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE medly_post = ?";
      mysqlConnection.query(updatestatus, [poststatus,flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
      }
      else{
        //cosnole.log(topicdata);
        const updatestatus =
        "UPDATE posts_cms SET status = ?,topicId =?,flag_id=? WHERE myautoid = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE post_id = ?";
      mysqlConnection.query(updatestatus, [poststatus,topicdata,flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
        
      }
      

      }
      else if(poststatus=='H'){
      console.log(req.body);
      const comment = req.body.comment.toString();
      const flagData = req.body.status; 
      const topicdata = req.body.topicData;
      const currenttime = new Date();
      if(topicdata==null || topicdata==''){
        const updatestatus =
        "UPDATE posts_cms SET allocation_status = ?, flag_id=? WHERE myautoid = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE post_id = ?";
      mysqlConnection.query(updatestatus, [poststatus,flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
      }
      else{
        const updatestatus =
        "UPDATE posts_cms SET allocation_status = ?,topicId =?,flag_id=? WHERE myautoid = ?";
      const updatetime =
        "UPDATE posts_allocation set moderated_at = ?,comment=? WHERE post_id = ?";
      mysqlConnection.query(updatestatus, [poststatus,topicdata.toString(),,flagData,postid], (err, result) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(updatetime, [currenttime,comment, postid], (err, result) => {
            if (err) console.log(err);
            else {
              res.status(200)
              res.json({message:"Status updated successfuly"});
            }
          });
         // res.json({message:"Status updated successfuly"});
        }
        
      });
        
      }
      

      

      }
      else{
        res.json("No Correct Data")
      }
    }
    else
    {
      res.status(400);
      res.json({meassage:"post_id or status missing"});
    }
  
}
});

app.post("/posthold",verifyToken, (req, res) => {

  if(Object.keys(req.body).length === 0)
  {
    res.status(401)
     res.json({
       message:"Request Body is missing"});
   }
   else{
    if(Object.keys(req.body)[0]=='post_id'){
      //const username = req.body.username.toString();
      //let pass = req.body.password.toString();
      const postid = req.body.post_id.toString();
     // const poststatus = req.body.status.toString();
     const currenttime = new Date();
  const updatestatus =
    "UPDATE posts_cms SET allocation_status = 'H' WHERE myautoid = ?";
  const updatetime =
    "UPDATE posts_allocation set moderated_at = ? WHERE post_id = ?";
  mysqlConnection.query(updatestatus, [poststatus, postid], (err, result) => {
    if (err) console.log(err);
    else {
      mysqlConnection.query(updatetime, [currenttime, postid], (err, result) => {
        if (err) console.log(err);
        else {
          res.status(200)
          res.json({message:"Post submitted for review"});
        }
      });
     // res.json({message:"Status updated successfuly"});
    }
  });

    }
    else
    {
      res.status(400);
      res.json({meassage:"post_id is missing"});
    }

  
}
});


exports.app = app;
