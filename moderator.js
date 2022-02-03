const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('./connection');
const verifyToken = require('./utils/verifyToken');
jwtkey = ')@345167';
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

let cmspostRes = [];
let medlypostRes = [];

//To get the moderator all the post alocated to the user for CMP data for the
app.get('/moderator', verifyToken, (req, res) => {
  let rolename = '';
  let userid = '';
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token = bearer[1];
  jwt.verify(req.token, jwtkey, (err, authData) => {
    if (err) {
      res.json({ result: err });
    } else {
      rolename = authData.role_name;
      userid = authData.id;
    }
  });

  if (rolename === 'Agent') {
    const sql =
      "SELECT * FROM posts_cms WHERE myautoid IN (SELECT post_id FROM posts_allocation WHERE moderator_id ='" +
      userid +
      "'and moderated_at is null and post_id is not null)";

    mysqlConnection.query(sql, (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length == 0) {
          res.status(404).json({ error: 'NO DATA' });
        } else {
          res.json({ result: result });
        }
      }
    });
  }
  //To get the medly post data for the medly users
  else if (rolename === 'Medly') {
    const medlysql =
      "SELECT * FROM medly_post WHERE post_id IN (SELECT medly_postid FROM posts_allocation WHERE moderator_id ='" +
      userid +
      "'and moderated_at is null and medly_postid is not null)";

    mysqlConnection.query(medlysql, (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length == 0) {
          res.status(404).json({ error: 'NO DATA' });
        } else {
          res.json({ result: result });
        }
      }
    });
  } else {
    res.json({ message: 'You are not Authorized' });
  }
});

//To get the mod data for the mod of role of agent
app.get('/modsummary', verifyToken, (req, res) => {
  let rolename = '';
  let userid = '';
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token = bearer[1];
  jwt.verify(req.token, jwtkey, (err, authData) => {
    if (err) {
      res.json({ result: err });
    } else {
      rolename = authData.role_name;
      username = authData.username;
      if (rolename === 'Agent') {
        let modData = [];
        const dailyData =
          "SELECT * FROM agentBycmsreport where `Agent Name` ='" +
          username +
          "' and Date >=date_sub(now(),interval 7 day) order by Date ";
        const monthlyData =
          "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentBycmsreport where `Agent Name` ='" +
          username +
          "' group by month order by month limit 5";

        mysqlConnection.query(dailyData, (err, dailyDataresult) => {
          if (err) console.log(err);
          else {
            mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
              if (err) console.log(err);
              else {
                modData.push({ dailyDataresult, monthlyDataresult });
                res.json(modData);
              }
            });
          }
        });
      } else if (rolename === 'Medly') {
        let modData = [];
        // const sql =
        // "SELECT * FROM agentBycmsreport where `Agent Name` ='"+username+"'";
        const dailyData =
          "SELECT `Agent Name`,Approved,Rejected,Hold,date as Date FROM agentByMedlyreport where `Agent Name` ='" +
          username +
          "' and Date >=date_sub(now(),interval 7 day) order by Date";
        const monthlyData =
          "select extract(MONTH from date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentByMedlyreport where `Agent Name` ='" +
          username +
          "' group by month order by month limit 5";

        mysqlConnection.query(dailyData, (err, dailyDataresult) => {
          if (err) console.log(err);
          else {
            //console.log(dailyDataresult);
            mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
              if (err) console.log(err);
              else {
                modData.push({ dailyDataresult, monthlyDataresult });
                res.json(modData);
              }
            });
          }
        });
      } else {
        res.json({ message: 'You are not Authorized' });
      }
    }
  });
});

//To get the mod dashboard data for the role of the agent
app.get('/moddashboard', verifyToken, (req, res) => {
  let rolename = '';
  let userid = '';
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token = bearer[1];
  jwt.verify(req.token, jwtkey, (err, authData) => {
    if (err) {
      res.json({ result: err });
    } else {
      //console.log(authData);
      rolename = authData.role_name;
      userid = authData.id;
      //console.log(rolename);
      //next();
    }
  });

  if (rolename === 'Agent') {
    let resultdata = [];

    //  and moderated_at >=date_sub(now(),interval 1 day)

    const sql =
      "select count(post_id) as totalPost from posts_allocation where moderator_id='" +
      userid +
      "'";
    const postsql =
      "select count(myautoid) as approvedPost from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where  status ='1' and allocation_status='Y' and posts_cms.moderator_id='" +
      userid +
      "'";
    const declinedpost =
      "select count(myautoid) as declinedPost from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where  status ='0' and allocation_status='Y' and posts_cms.moderator_id='" +
      userid +
      "'";
    const holdPost =
      "select count(myautoid) as holdPost from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where allocation_status='H' and posts_cms.moderator_id='" +
      userid +
      "'";

    mysqlConnection.query(sql, (err, result1) => {
      if (err) console.log(err);
      else {
        resultdata.push(result1);
        mysqlConnection.query(postsql, (err, result2) => {
          if (err) console.log(err);
          else {
            resultdata.push(result2);
            mysqlConnection.query(declinedpost, (err, result3) => {
              if (err) console.log(err);
              else {
                resultdata.push(result3);
                mysqlConnection.query(holdPost, (err, result4) => {
                  if (err) console.log(err);
                  else {
                    resultdata.push(result4);
                    res.json({ result: resultdata });
                  }
                });
              }
            });
          }
        });
      }
    });
  } else if (rolename === 'Medly') {
    let resultdata = [];
    const sql =
      "select count(medly_postid) as totalPost from posts_allocation where moderator_id='" +
      userid +
      "'";
    const postsql =
      "select count(medly_post.post_id) as approvedPost from medly_post inner join posts_allocation on medly_post.post_id=posts_allocation.medly_postid where status ='1' and allocation_status='Y' and medly_post.moderator_id='" +
      userid +
      "'";
    const declinedpost =
      "select count(medly_post.post_id) as declinedPost from medly_post inner join posts_allocation on medly_post.post_id=posts_allocation.medly_postid where status ='0' and allocation_status='Y' and medly_post.moderator_id='" +
      userid +
      "'";
    const holdPost =
      "select count(medly_post.post_id) as holdPost from medly_post inner join posts_allocation on medly_post.post_id=posts_allocation.medly_postid where  allocation_status='H' and medly_post.moderator_id='" +
      userid +
      "'";

    mysqlConnection.query(sql, (err, result1) => {
      if (err) console.log(err);
      else {
        resultdata.push(result1);
        mysqlConnection.query(postsql, (err, result2) => {
          if (err) console.log(err);
          else {
            resultdata.push(result2);
            mysqlConnection.query(declinedpost, (err, result3) => {
              if (err) console.log(err);
              else {
                resultdata.push(result3);
                mysqlConnection.query(holdPost, (err, result4) => {
                  if (err) console.log(err);
                  else {
                    resultdata.push(result4);
                    res.json({ result: resultdata });
                  }
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.json({ message: 'You are not Authorized' });
  }
});

//To get the mod dashboard data for the role of the agent in is not used right now
app.get('/moderatordata', verifyToken, (req, res) => {
  let rolename = '';
  let userid = '';
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token = bearer[1];
  jwt.verify(req.token, jwtkey, (err, authData) => {
    if (err) {
      res.json({ result: err });
    } else {
      //console.log(authData);
      rolename = authData.role_name;
      userid = authData.id;
      //console.log(rolename);
      //next();
    }
  });
  if (rolename === 'Agent') {
    const getModDatatotal =
      'select count(*) as totalpost,allocated_at as allocatedDate from meestdbcm2.posts_allocation WHERE allocated_at >= NOW() + INTERVAL -7 DAY' +
      ' AND allocated_at <  NOW() + INTERVAL  0 DAY and moderator_id= ? GROUP BY date(allocated_at);';

    const getModDataapproved =
      'select count(posts_cms.myautoid) as approvedpost,posts_allocation.allocated_at as allocatedDate from meestdbcm2.posts_allocation  inner join posts_cms on posts_allocation.post_id = posts_cms.myautoid  WHERE posts_allocation.allocated_at >= NOW() + INTERVAL -5 DAY' +
      " AND posts_allocation.allocated_at <  NOW() + INTERVAL  0 DAY and posts_allocation.moderator_id= ? and posts_cms.status='1' GROUP BY date(allocated_at);";

    const getModDatarejected =
      'select count(posts_cms.myautoid) as approvedpost,posts_allocation.allocated_at as allocatedDate from meestdbcm2.posts_allocation  inner join posts_cms on posts_allocation.post_id = posts_cms.myautoid  WHERE posts_allocation.allocated_at >= NOW() + INTERVAL -5 DAY' +
      " AND posts_allocation.allocated_at <  NOW() + INTERVAL  0 DAY and posts_allocation.moderator_id= ? and posts_cms.status='0' GROUP BY date(allocated_at);";

    const getModDatahold =
      'select count(posts_cms.myautoid) as approvedpost,posts_allocation.allocated_at as allocatedDate from meestdbcm2.posts_allocation  inner join posts_cms on posts_allocation.post_id = posts_cms.myautoid  WHERE posts_allocation.allocated_at >= NOW() + INTERVAL -5 DAY' +
      " AND posts_allocation.allocated_at <  NOW() + INTERVAL  0 DAY and posts_allocation.moderator_id= ? and posts_cms.allocation_status='0' GROUP BY date(allocated_at);";

    const currenttime = new Date();

    mysqlConnection.query(getModDatatotal, [userid], (err, modresults) => {
      if (err) {
        console.log(err);
      } else {
        mysqlConnection.query(
          getModDataapproved,
          [userid],
          (err, approvedesults) => {
            if (err) {
              console.log(err);
            } else {
              mysqlConnection.query(
                getModDatarejected,
                [userid],
                (err, rejectedresults) => {
                  if (err) {
                    console.log(err);
                  } else {
                    mysqlConnection.query(
                      getModDatahold,
                      [userid],
                      (err, holdresults) => {
                        if (err) {
                          console.log(err);
                        } else {
                          res.json({
                            modresults,
                            approvedesults,
                            rejectedresults,
                            holdresults,
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });

    //res.json({message:'coming soon'})
  } else {
  }
});

//To get the all the flag data
app.get('/flagdata', verifyToken, (req, res) => {
  let flags = [];
  //const flagcategory = "SELECT distinct(flag_category) as flagCategory,id as flagid  FROM meestdbcm2.flags"
  const flagName =
    'select distinct(flag_name) as flagName,id as flagid from meestdbcm2.flags where flag_name is not null';

  // console.log(updatepostresults)
  mysqlConnection.query(flagName, (err, flagnameresults) => {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < flagnameresults.length; i++) {
        flags.push({
          value: flagnameresults[i].flagid,
          label: flagnameresults[i].flagName,
        });
      }

      res.json({ flagname: flags });
      //console.log(flagnameresults)
    }
  });
  // const currenttime = new Date();
  //res.json({message:'coming soon'})
  //const agenalltdata = "SELECT count(*) FROM posts_allocation WHERE moderator_id ='"+userid+"' and ";
  // const data1="select COUNT(*) as post,(format(CONVERT(date, allocated_at, 105),'yyyy-MM-dd'))as allocatedDate from posts_allocation group by (format(CONVERT(date, allocated_at, 105),'yyyy-MM-dd'))"
  // mysqlConnection.query(data1, (err, data1Result) => {
  //   if (err) console.log(err);
  //   else {
  //     console.log(data1Result);
  //   }
  // });
});

//To get the all the category data
app.get('/topicdata', verifyToken, (req, res) => {
  let topicsarr = [];
  //const flagcategory = "SELECT distinct(flag_category) as flagCategory,id as flagid  FROM meestdbcm2.flags"
  const topicName =
    'select distinct(topic) as topic,id as topicid from meestdbcm2.category where topic is not null';

  // console.log(updatepostresults)
  mysqlConnection.query(topicName, (err, topicNameresults) => {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < topicNameresults.length; i++) {
        topicsarr.push({
          value: topicNameresults[i].topicid,
          label: topicNameresults[i].topic,
        });
      }
      res.json({ topicName: topicsarr });
      //console.log(flagnameresults)
    }
  });
  // const currenttime = new Date();
  //res.json({message:'coming soon'})
  //const agenalltdata = "SELECT count(*) FROM posts_allocation WHERE moderator_id ='"+userid+"' and ";
  // const data1="select COUNT(*) as post,(format(CONVERT(date, allocated_at, 105),'yyyy-MM-dd'))as allocatedDate from posts_allocation group by (format(CONVERT(date, allocated_at, 105),'yyyy-MM-dd'))"
  // mysqlConnection.query(data1, (err, data1Result) => {
  //   if (err) console.log(err);
  //   else {
  //     console.log(data1Result);
  //   }
  // });
});

//To realocate the post to the user for CMS
app.get('/moderatorallocate', verifyToken, (req, res) => {
  let rolename = '';
  let userid = '';
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token = bearer[1];
  jwt.verify(req.token, jwtkey, (err, authData) => {
    if (err) {
      res.json({ result: err });
    } else {
      rolename = authData.role_name;
      userid = authData.id;
    }
  });
  if (rolename === 'Agent') {
    const postallocation =
      "SELECT myautoid FROM posts_cms WHERE allocation_status='N' ORDER BY createdAt DESC limit 5";
    // const postallocationmedly = "SELECT post_id FROM medly_post WHERE allocation_status='N' limit 5";
    const allocatecms =
      'INSERT INTO posts_allocation (moderator_id,post_id) VALUES ?';
    //const allocatemedly = "INSERT INTO posts_allocation (moderator_id,medly_postid) VALUES ?"
    const chngestatuscms =
      "update posts_cms set moderator_id= ?, allocation_status = 'Y' where myautoid=?";
    // const chngestatusmedly = "update medly_post set allocation_status = 'Y' where post_id=?"

    const cmdpost = function (postallocation, callback) {
      mysqlConnection.query(postallocation, (err, postresults) => {
        if (err) {
          callback(err);
        } else {
          callback(postresults);
        }
      });
    };

    // const medlypost = function(postallocationmedly,callback) {
    //   mysqlConnection.query(postallocationmedly, (err, medlyresults) => {
    //     if (err)
    //       {callback(err)}
    //     else {
    //       callback(medlyresults);
    //     }
    //   });
    // }

    cmdpost(postallocation, function (postresults) {
      if (postresults.length == '0') {
        res.status(404).json({ error: 'NO DATA' });
      } else {
        for (j = 0; j < postresults.length; j++) {
          let aloocatevalues = [[userid, postresults[j].myautoid]];
          mysqlConnection.query(
            allocatecms,
            [aloocatevalues],
            (err, result1) => {
              if (err) {
                console.log(err);
              }
            }
          );
          mysqlConnection.query(
            chngestatuscms,
            [userid, postresults[j].myautoid],
            (err, result1) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
        res.status(200).send({ msg: 'Post Allocated' });
      }
    });

    // medlypost(postallocationmedly,function (medlyresults) {
    //     if(medlyresults.length=='0'){
    //       console.log("No medly Post to allocate");
    //      // res.send({msg:"no post"})
    //     }
    //     else{
    //       console.log(medlyresults);
    //       for(k=0;k<medlyresults.length;k++){
    //         let aloocatemeldlyvalues = [[userid,medlyresults[k].post_id]];
    //       mysqlConnection.query(allocatemedly,[aloocatemeldlyvalues], (err, result1) => {
    //         if (err)
    //           {
    //             console.log(err);
    //           }
    //       });
    //       mysqlConnection.query(chngestatusmedly,[medlyresults[k].post_id], (err, result3) => {
    //         if (err)
    //           {
    //             console.log(err);
    //           }
    //         });
    //     }
    //     }

    // })
  } else if (rolename === 'Medly') {
    // const postallocation = "SELECT myautoid FROM posts_cms WHERE allocation_status='N' ORDER BY createdAt DESC limit 5";
    const postallocationmedly =
      "SELECT post_id FROM medly_post WHERE allocation_status='N' ORDER BY created_date DESC limit 5";
    // const allocatecms = "INSERT INTO posts_allocation (moderator_id,post_id) VALUES ?"
    const allocatemedly =
      'INSERT INTO posts_allocation (moderator_id,medly_postid) VALUES ?';
    //const chngestatuscms = "update posts_cms set allocation_status = 'Y' where myautoid=?"
    const chngestatusmedly =
      "update medly_post set moderator_id = ?, allocation_status = 'Y' where post_id=?";

    // const cmdpost = function(postallocation,callback) {
    //   mysqlConnection.query(postallocation, (err, postresults) => {
    //     if (err)
    //       {callback(err)}
    //     else {
    //       callback(postresults);
    //     }
    //   });
    // }

    const medlypost = function (postallocationmedly, callback) {
      mysqlConnection.query(postallocationmedly, (err, medlyresults) => {
        if (err) {
          callback(err);
        } else {
          callback(medlyresults);
        }
      });
    };

    // cmdpost(postallocation,function (postresults) {
    //   if(postresults.length=='0'){
    //     console.log("No CMS Post to allocate");
    //   }
    //   else{
    //     for(j=0;j<postresults.length;j++){
    //     let aloocatevalues = [[userid,postresults[j].myautoid]];
    //     mysqlConnection.query(allocatecms,[aloocatevalues], (err, result1) => {
    //       if (err)
    //         {
    //           console.log(err);
    //         }

    //     });
    //     mysqlConnection.query(chngestatuscms,[postresults[j].myautoid], (err, result1) => {
    //       if (err)
    //         {
    //           console.log(err);
    //         }

    //       });
    //   }
    //   }
    // });

    medlypost(postallocationmedly, function (medlyresults) {
      if (medlyresults.length == '0') {
        res.status(404).send('No medly Post to allocate');
      } else {
        //console.log(medlyresults);
        for (k = 0; k < medlyresults.length; k++) {
          let aloocatemeldlyvalues = [[userid, medlyresults[k].post_id]];
          mysqlConnection.query(
            allocatemedly,
            [aloocatemeldlyvalues],
            (err, result1) => {
              if (err) {
                console.log(err);
              }
            }
          );
          mysqlConnection.query(
            chngestatusmedly,
            [userid, medlyresults[k].post_id],
            (err, result3) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
        res.status(200).send({ msg: 'Post Allocated' });
      }
    });
  } else {
    res.json('No authority');
  }
});

//To get the all video holded by the moderator
app.post('/modholdedpost', verifyToken, (req, res) => {
  // console.log(req);
  let startdate = req.body.startdate1;
  let enddate = req.body.enddate2;

  let rolename = '';
  let userid = '';
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token = bearer[1];
  jwt.verify(req.token, jwtkey, (err, authData) => {
    if (err) {
      res.json({ result: err });
    } else {
      rolename = authData.role_name;
      userid = authData.id;
    }
  });

  if (rolename === 'Agent') {
    //  console.log(startdate,enddate);
    if (startdate == null || enddate == null) {
      const sql =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='H' and posts_cms.moderator_id='" +
        userid +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE()) order by moderated_at desc";
      mysqlConnection.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(200).json({ error: 'NO DATA' });
          } else {
            res.status(200).json({ result: result });
          }
        }
      });
    } else {
      const sql =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='H' and posts_cms.moderator_id='" +
        userid +
        "'and moderated_at between '" +
        startdate +
        "' and '" +
        enddate +
        "'  order by moderated_at desc";
      mysqlConnection.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(200).json({ error: 'NO DATA' });
          } else {
            res.status(200).json({ result: result });
          }
        }
      });
    }
    //"select * from posts_cms where allocation_status='H' and moderator_id='"+userid+"'";
  }
  //To get the medly post data for the medly users
  else if (rolename === 'Medly') {
    //const sql ="select * from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where allocation_status='H' and posts_cms.moderator_id='"+userid+"' order by moderated_at desc"
    if (startdate == null || enddate == null) {
      const medlysql =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='H' and medly_post.moderator_id='" +
        userid +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE()) order by moderated_at desc";
      mysqlConnection.query(medlysql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(200).json({ error: 'NO DATA' });
          } else {
            res.status(200).json({ result: result });
          }
        }
      });
    } else {
      const medlysql =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='H' and medly_post.moderator_id='" +
        userid +
        "'and moderated_at between '" +
        startdate +
        "' and '" +
        enddate +
        "'  order by moderated_at desc";
      mysqlConnection.query(medlysql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(200).json({ error: 'NO DATA' });
          } else {
            res.status(200).json({ result: result });
          }
        }
      });
    }
  } else {
    res.json({ message: 'You are not Authorized' });
  }
});

//To get the all video holded by the moderator
app.post('/modrejectpost', verifyToken, (req, res) => {
  let startdate = req.body.startdate1;
  let enddate = req.body.enddate2;

  let rolename = '';
  let userid = '';
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  req.token = bearer[1];
  jwt.verify(req.token, jwtkey, (err, authData) => {
    if (err) {
      res.json({ result: err });
    } else {
      rolename = authData.role_name;
      userid = authData.id;
    }
  });

  if (rolename === 'Agent') {
    if (startdate == null || enddate == null) {
      const sql =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where status = '0' and allocation_status='Y' and posts_cms.moderator_id='" +
        userid +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE()) order by moderated_at desc";
      mysqlConnection.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(200).json({ error: 'NO DATA' });
          } else {
            res.status(200).json({ result: result });
          }
        }
      });
    } else {
      const sql =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where status = '0' and allocation_status='Y' and posts_cms.moderator_id='" +
        userid +
        "'and moderated_at between '" +
        startdate +
        "' and '" +
        enddate +
        "' order by moderated_at desc";
      mysqlConnection.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(200).json({ error: 'NO DATA' });
          } else {
            res.status(200).json({ result: result });
          }
        }
      });
    }
  }
  //To get the medly post data for the medly users
  else if (rolename === 'Medly') {
    if (startdate == null || enddate == null) {
      const medlysql =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where status ='0' and allocation_status='Y' and medly_post.moderator_id='" +
        userid +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE()) order by moderated_at desc";
      mysqlConnection.query(medlysql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(404).json({ error: 'NO DATA' });
          } else {
            res.json({ result: result });
          }
        }
      });
    } else {
      const medlysql =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where status ='0' and allocation_status='Y' and medly_post.moderator_id='" +
        userid +
        "'and moderated_at between '" +
        startdate +
        "' and '" +
        enddate +
        "' order by moderated_at desc";
      mysqlConnection.query(medlysql, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            res.status(404).json({ error: 'NO DATA' });
          } else {
            res.json({ result: result });
          }
        }
      });
    }
  } else {
    res.json({ message: 'You are not Authorized' });
  }
});

// mysqlConnection.end();

exports.app = app;
