const DetailsfromToken = require('../utils/DetailsfromToken');
const mysqlConnection = require('../connection');

exports.getadminmeestdashdata = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  let meestdata = [];
  const meestsql =
    'select count(post_id) as totalPost from posts_allocation where moderated_at >=date_sub(now(),interval 1 hour)';
  const meestpostsql =
    "select count(myautoid) as approvedPost from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where posts_allocation.moderated_at >=date_sub(now(),interval 1 hour) and status ='1' and allocation_status='Y'";
  const meestdeclinedpost =
    "select count(myautoid) as declinedPost from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where posts_allocation.moderated_at >=date_sub(now(),interval 1 hour) and status ='0' and allocation_status='Y'";
  const meestholdPost =
    "select count(myautoid) as holdPost from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where posts_allocation.moderated_at >=date_sub(now(),interval 1 hour) and allocation_status='H'";

  mysqlConnection.query(meestsql, (err, meestsqlresult) => {
    if (err) console.log(err);
    else {
      meestdata.push(meestsqlresult);
      mysqlConnection.query(meestpostsql, (err, meestpostsqlresult) => {
        if (err) console.log(err);
        else {
          meestdata.push(meestpostsqlresult);
          mysqlConnection.query(
            meestdeclinedpost,
            (err, meestdeclinedpostresult) => {
              if (err) console.log(err);
              else {
                meestdata.push(meestdeclinedpostresult);
                mysqlConnection.query(
                  meestholdPost,
                  (err, meestholdPostresult) => {
                    if (err) console.log(err);
                    else {
                      meestdata.push(meestholdPostresult);
                      res.json({ meest: meestdata });
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
};

exports.getadminmedleydashdata = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  let medlydata = [];
  const sql =
    'select count(medly_postid) as totalPost from posts_allocation where moderated_at >=date_sub(now(),interval 1 hour)';
  const postsql =
    "select count(medly_post.post_id) as approvedPost from medly_post inner join posts_allocation on medly_post.post_id=posts_allocation.medly_postid where posts_allocation.moderated_at >=date_sub(now(),interval 1 hour) and status ='1' and allocation_status='Y'";
  const declinedpost =
    "select count(medly_post.post_id) as declinedPost from medly_post inner join posts_allocation on medly_post.post_id=posts_allocation.medly_postid where posts_allocation.moderated_at >=date_sub(now(),interval 1 hour) and status ='0' and allocation_status='Y'";
  const holdPost =
    "select count(medly_post.post_id) as holdPost from medly_post inner join posts_allocation on medly_post.post_id=posts_allocation.medly_postid where posts_allocation.moderated_at >=date_sub(now(),interval 1 hour) and allocation_status='H'";

  mysqlConnection.query(sql, (err, result1) => {
    if (err) console.log(err);
    else {
      medlydata.push(result1);
      mysqlConnection.query(postsql, (err, result2) => {
        if (err) console.log(err);
        else {
          medlydata.push(result2);
          mysqlConnection.query(declinedpost, (err, result3) => {
            if (err) console.log(err);
            else {
              medlydata.push(result3);
              mysqlConnection.query(holdPost, (err, result4) => {
                if (err) console.log(err);
                else {
                  medlydata.push(result4);
                  res.json({ medly: medlydata });
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.getadminChartdata = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  let resultData = [];
  const meestchartdataDaily =
    'select * from `dateBycmsreport` where Date >=date_sub(now(),interval 7 day) order by Date';
  const meestchartdataMonthly =
    'select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from dateBycmsreport group by month order by month limit 7';
  const medleyhartdataDaily =
    'SELECT cast(date as date) as Date, SUM(Approved) as Approved, SUM(Rejected) as Rejected,SUM(Hold) as Hold from meestdbcm2.agentByMedlyreport where Date >=date_sub(now(),interval 7 day) GROUP BY date order by date limit 7';
  const medleyhartdataMonthly =
    'select extract(MONTH from date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from meestdbcm2.agentByMedlyreport group by month order by month limit 7';

  mysqlConnection.query(
    meestchartdataDaily,
    (err, meestchartdataDailyresult) => {
      if (err) console.log(err);
      else {
        mysqlConnection.query(
          meestchartdataMonthly,
          (err, meestchartdataMonthlyyresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(
                medleyhartdataDaily,
                (err, medleyhartdataDailyresult) => {
                  if (err) console.log(err);
                  else {
                    mysqlConnection.query(
                      medleyhartdataMonthly,
                      (err, medleyhartdataMonthlyresult) => {
                        if (err) console.log(err);
                        else {
                          resultData.push({
                            meestchartdataDailyresult,
                            meestchartdataMonthlyyresult,
                            medleyhartdataDailyresult,
                            medleyhartdataMonthlyresult,
                          });
                          res.json(resultData);
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
    }
  );
};

exports.EDmodservice = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  if (
    Object.keys(req.body)[0] == 'mod_id' &&
    Object.keys(req.body)[1] == 'isDisabled'
  ) {
    const mod_id = req.body.mod_id;
    const isDisabled = req.body.isDisabled;

    const sql = 'update users set isDisabled = ?,isOnline = false where id = ?';
    const getusersession =
      "select * from loginhistory where userId='" +
      mod_id +
      "' and logoutdate is null order by logindate desc limit 1";
    const logoutusr =
      'update loginhistory set logoutdate = ? where userId = ? and token = ?';
    const currenttime = new Date();
    utc = currenttime.getTime() + currenttime.getTimezoneOffset() * 60000;
    var istcurrenttime = new Date(utc + 3600000 * +5.5);

    mysqlConnection.query(sql, [isDisabled, mod_id], (err, result) => {
      if (err) console.log(err);
      else {
        mysqlConnection.query(getusersession, (err, getusersessionresult) => {
          if (err) console.log(err);
          else {
            if (getusersessionresult.length === 1) {
              mysqlConnection.query(
                logoutusr,
                [istcurrenttime, mod_id, getusersessionresult[0].token],
                (err, result) => {
                  if (err) console.log(err);
                  else {
                    res.json({ message: 'Data is Updated Successfully' });
                  }
                }
              );
            } else {
              res.json({ message: 'Data is Updated Successfully' });
            }
          }
        });
      }
    });
  } else {
    res.status(401).json({ message: 'Wrong Data' });
  }
};

exports.deletemod = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  if (Object.keys(req.body).length === 0) {
    res.status(401);
    res.json({
      message: 'Request Body is missing',
    });
  } else {
    if (Object.keys(req.body)[0] == 'mod_id') {
      const mod_id = req.body.mod_id;

      const sql =
        "update users set isDisabled ='1' ,deleted_at =? ,deleted = '1' where id = ?";
      mysqlConnection.query(sql, [currenttime, mod_id], (err, result) => {
        if (err) console.log(err);
        else {
          res.json({ message: 'Data is Updated Successfully' });
        }
      });
    } else {
      res.json('No Correct Data');
    }
  }
};

exports.lastdayposts = (req, res) => {
  {
    const sql =
      "SELECT * FROM posts_cms WHERE TIMESTAMPDIFF(DAY, createdAt, NOW()) = '1'";
    mysqlConnection.query(sql, (err, result) => {
      if (err) console.log(err);
      else {
        let totalposts = result.length;

        res.json({ totalposts: totalposts });
      }
    });
  }
};

exports.lastweekposts = (req, res) => {
  {
    const sql =
      "SELECT * FROM posts_cms WHERE TIMESTAMPDIFF(DAY, createdAt, NOW()) <= '7'";
    mysqlConnection.query(sql, (err, result) => {
      if (err) console.log(err);
      else {
        let totalposts = result.length;
        res.json({ totalposts: totalposts });
      }
    });
  }
};

exports.holdedpost = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };
  const sql =
    "SELECT a.*,b.comment,c.username,d.flag_name FROM posts_cms a join posts_allocation b on a.myautoid=b.post_id join users c on c.id=b.moderator_id join flags d on d.id=a.flag_id WHERE allocation_status='H'and holdcaseapproveby is null order by b.moderated_at desc ";
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
};

exports.rejectedpost = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };
  const sql =
    "SELECT a.*,b.comment,c.username,d.flag_name FROM posts_cms a join posts_allocation b on a.myautoid=b.post_id join users c on c.id=b.moderator_id join flags d on d.id=a.flag_id WHERE status='0' and allocation_status='Y' order by b.moderated_at desc ";

  // const sql =
  // "SELECT * FROM posts_cms a join posts_allocation b on a.myautoid=b.post_id WHERE status='0' and allocation_status='Y' order by b.moderated_at desc";
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
};

exports.holdedmedlypost = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };
  const sql =
    "SELECT a.*,b.comment,c.username,d.flag_name FROM medly_post a join posts_allocation b on a.post_id=b.medly_postid join users c on c.id=b.moderator_id join flags d on d.id=a.flag_id WHERE allocation_status='H'and holdcaseapproveby is null order by b.moderated_at desc";
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
};

exports.getalluserdata = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  const sql =
    "SELECT a.id,username,email,a.created_at,deleted,deleted_at,FName as firstName,LName as lastName, b.role_id,isDisabled,password,isOnline,lastlogin FROM meestdbcm2.users a join users_auth b on a.id = b.user_id where b.role_id <> '3' order by isOnline desc";
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
};

exports.getagentdatabyid = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  const mod_username = req.body.mod_username;
  const mod_roleid = req.body.mod_roleid;
  const key = req.body.key;
  const mod_id = req.body.mod_id;
  // console.log(req.body.mod_username,req.body.mod_roleid)
  if (key == 'TODAY') {
    if (mod_roleid === 2) {
      let modData = [];
      let modpostData = [];

      const radialdata =
        "SELECT `Agent name` as AgentName,sum(Approved) as Approved,sum(Rejected) as Rejected ,sum(Hold) as Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='" +
        mod_username +
        "' and DATE(date)=CURDATE() group by AgentName;";
      // const radialdata2 ="SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='"+mod_username+"' and Date = date(now())  ;" and Date >=date_sub(now(),interval 5 day)
      const dailyData =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "'and DATE(date)=CURDATE() order by Date";
      const modapprovepost =
        "select posts_cms.*,posts_allocation.* from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id  where allocation_status='Y' and status='1' and posts_cms.moderator_id='" +
        mod_id +
        "'and DATE(moderated_at)=CURDATE() order by moderated_at desc";
      const modholdpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='H' and posts_cms.moderator_id='" +
        mod_id +
        "'and DATE(moderated_at)=CURDATE() order by moderated_at desc";
      const modrejectpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='Y'and status='0' and posts_cms.moderator_id='" +
        mod_id +
        "'and DATE(moderated_at)=CURDATE() order by moderated_at desc";
      const sessiondata =
        "SELECT * FROM meestdbcm2.loginhistory where userId='" +
        mod_id +
        "' and DATE(logindate) = curdate() group by token order by logindate";
      const monthlyData =
        "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "' group by month order by month limit 5";

      mysqlConnection.query(radialdata, (err, radialdataresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  mysqlConnection.query(
                    modapprovepost,
                    (err, modapprovepostresult) => {
                      if (err) console.log(err);
                      else {
                        mysqlConnection.query(
                          modholdpost,
                          (err, modholdpostresult) => {
                            if (err) console.log(err);
                            else {
                              mysqlConnection.query(
                                modrejectpost,
                                (err, modrejectpostresult) => {
                                  if (err) console.log(err);
                                  else {
                                    mysqlConnection.query(
                                      sessiondata,
                                      (err, sessiondataresult) => {
                                        if (err) console.log(err);
                                        else {
                                          console.log(sessiondataresult);
                                          modpostData.push({
                                            modapprovepostresult,
                                            modholdpostresult,
                                            modrejectpostresult,
                                          });
                                          modData.push({
                                            dailyDataresult,
                                            monthlyDataresult,
                                            radialdataresult,
                                            modpostData,
                                            sessiondataresult,
                                          });
                                          console.log(modData);
                                          res.json(modData);
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
                    }
                  );
                }
              });
            }
          });
        }
      });
    } else if (mod_roleid === 1) {
      let modData = [];
      let modpostData = [];

      const radialdata =
        "SELECT `Agent name` as AgentName,sum(Approved) as Approved,sum(Rejected) as Rejected ,sum(Hold) as Hold,Date FROM meestdbcm2.agentByMedlyreport where `Agent Name`='" +
        mod_username +
        "' and DATE(date)=CURDATE() group by AgentName;";
      // const radialdata2 ="SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='"+mod_username+"' and Date = date(now())  ;" and Date >=date_sub(now(),interval 5 day)
      const dailyData =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "'and DATE(date)=CURDATE() order by Date";
      const modapprovepost =
        "select medly_post.*,posts_allocation.* from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join  where allocation_status='Y' and status='1' and medly_post.moderator_id='" +
        mod_id +
        "'and DATE(moderated_at)=CURDATE() order by moderated_at desc";
      const modholdpost =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='H' and medly_post.moderator_id='" +
        mod_id +
        "'and DATE(moderated_at)=CURDATE() order by moderated_at desc";
      const sessiondata =
        "SELECT * FROM meestdbcm2.loginhistory where userId='" +
        mod_id +
        "' and DATE(logindate) = curdate()  group by token";
      const modrejectpost =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='Y'and status='0' and medly_post.moderator_id='" +
        mod_id +
        "'and DATE(moderated_at)=CURDATE() order by moderated_at desc";
      const monthlyData =
        "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "' group by month order by month limit 5";

      mysqlConnection.query(radialdata, (err, radialdataresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  mysqlConnection.query(
                    modapprovepost,
                    (err, modapprovepostresult) => {
                      if (err) console.log(err);
                      else {
                        mysqlConnection.query(
                          modholdpost,
                          (err, modholdpostresult) => {
                            if (err) console.log(err);
                            else {
                              mysqlConnection.query(
                                modrejectpost,
                                (err, modrejectpostresult) => {
                                  if (err) console.log(err);
                                  else {
                                    mysqlConnection.query(
                                      sessiondata,
                                      (err, sessiondataresult) => {
                                        if (err) console.log(err);
                                        else {
                                          modpostData.push({
                                            modapprovepostresult,
                                            modholdpostresult,
                                            modrejectpostresult,
                                          });
                                          modData.push({
                                            dailyDataresult,
                                            monthlyDataresult,
                                            radialdataresult,
                                            modpostData,
                                            sessiondataresult,
                                          });
                                          res.json(modData);
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
                    }
                  );
                }
              });
            }
          });
        }
      });
    } else {
      res.status(402).json({ message: 'Wrong RoleID' });
    }
  } else if (key == 'MONTH') {
    if (mod_roleid === 2) {
      let modData = [];
      let modpostData = [];

      const radialdata =
        "SELECT `Agent name` as AgentName,sum(Approved) as Approved,sum(Rejected) as Rejected ,sum(Hold) as Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='" +
        mod_username +
        "' and YEAR(Date)=YEAR(now()) and MONTH(Date) = MONTH(now())-2 group by AgentName;";
      // const radialdata2 ="SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='"+mod_username+"' and Date = date(now())  ;" and Date >=date_sub(now(),interval 5 day)
      const dailyData =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "'and YEAR(Date)=YEAR(now()) and MONTH(Date) = MONTH(now())-1 order by Date";
      const modapprovepost =
        "select posts_cms.*,posts_allocation.* from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where allocation_status='Y' and status='1' and posts_cms.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE())-1 order by moderated_at desc";
      const modholdpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='H' and posts_cms.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE())-2 order by moderated_at desc";
      const modrejectpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='Y'and status='0' and posts_cms.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE())-2 order by moderated_at desc";

      const monthlyData =
        "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "' group by month order by month limit 5";

      mysqlConnection.query(radialdata, (err, radialdataresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  mysqlConnection.query(
                    modapprovepost,
                    (err, modapprovepostresult) => {
                      if (err) console.log(err);
                      else {
                        mysqlConnection.query(
                          modholdpost,
                          (err, modholdpostresult) => {
                            if (err) console.log(err);
                            else {
                              mysqlConnection.query(
                                modrejectpost,
                                (err, modrejectpostresult) => {
                                  if (err) console.log(err);
                                  else {
                                    modpostData.push({
                                      modapprovepostresult,
                                      modholdpostresult,
                                      modrejectpostresult,
                                    });
                                    modData.push({
                                      dailyDataresult,
                                      monthlyDataresult,
                                      radialdataresult,
                                      modpostData,
                                    });
                                    // console.log(modData)
                                    res.json(modData);
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
            }
          });
        }
      });
    } else if (mod_roleid === 1) {
      let modData = [];
      let modpostData = [];

      const radialdata =
        "SELECT `Agent name` as AgentName,sum(Approved) as Approved,sum(Rejected) as Rejected ,sum(Hold) as Hold,Date FROM meestdbcm2.agentByMedlyreport where `Agent Name`='" +
        mod_username +
        "' and YEAR(Date)=YEAR(now()) and MONTH(Date) = MONTH(now())-2 group by AgentName;";
      // const radialdata2 ="SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='"+mod_username+"' and Date = date(now())  ;" and Date >=date_sub(now(),interval 5 day)
      const dailyData =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "'and DATE(date)=CURDATE() order by Date";
      const modapprovepost =
        "select medly_post.*,posts_allocation.* from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid where allocation_status='Y' and status='1' and medly_post.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE())-1 order by moderated_at desc";
      const modholdpost =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='H' and medly_post.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE())-1 order by moderated_at desc";
      const modrejectpost =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='Y'and status='0' and medly_post.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) AND MONTH(moderated_at) = MONTH(CURRENT_DATE())-1 order by moderated_at desc";
      const monthlyData =
        "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "' group by month order by month limit 5";

      mysqlConnection.query(radialdata, (err, radialdataresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  mysqlConnection.query(
                    modapprovepost,
                    (err, modapprovepostresult) => {
                      if (err) console.log(err);
                      else {
                        mysqlConnection.query(
                          modholdpost,
                          (err, modholdpostresult) => {
                            if (err) console.log(err);
                            else {
                              mysqlConnection.query(
                                modrejectpost,
                                (err, modrejectpostresult) => {
                                  if (err) console.log(err);
                                  else {
                                    modpostData.push({
                                      modapprovepostresult,
                                      modholdpostresult,
                                      modrejectpostresult,
                                    });
                                    modData.push({
                                      dailyDataresult,
                                      monthlyDataresult,
                                      radialdataresult,
                                      modpostData,
                                    });
                                    res.json(modData);
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
            }
          });
        }
      });
    } else {
      res.status(402).json({ message: 'Wrong RoleID' });
    }
  } else if (key == 'YEAR') {
    if (mod_roleid === 2) {
      let modData = [];
      let modpostData = [];
      // console.log(mod_id);
      const radialdata =
        "SELECT `Agent name` as AgentName,sum(Approved) as Approved,sum(Rejected) as Rejected ,sum(Hold) as Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='" +
        mod_username +
        "' and YEAR(Date)=YEAR(now()) group by AgentName;";
      // const radialdata2 ="SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='"+mod_username+"' and Date = date(now())  ;" and Date >=date_sub(now(),interval 5 day)
      const dailyData =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "'and YEAR(Date)=YEAR(now()) order by Date";
      const modapprovepost =
        "select posts_cms.*,posts_allocation.* from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where allocation_status='Y' and status='1' and posts_cms.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) order by moderated_at desc";
      const modholdpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='H' and posts_cms.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE())  order by moderated_at desc";
      const modrejectpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='Y'and status='0' and posts_cms.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) order by moderated_at desc";

      const monthlyData =
        "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "' group by month order by month limit 5";

      mysqlConnection.query(radialdata, (err, radialdataresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  mysqlConnection.query(
                    modapprovepost,
                    (err, modapprovepostresult) => {
                      if (err) console.log(err);
                      else {
                        mysqlConnection.query(
                          modholdpost,
                          (err, modholdpostresult) => {
                            if (err) console.log(err);
                            else {
                              mysqlConnection.query(
                                modrejectpost,
                                (err, modrejectpostresult) => {
                                  if (err) console.log(err);
                                  else {
                                    modpostData.push({
                                      modapprovepostresult,
                                      modholdpostresult,
                                      modrejectpostresult,
                                    });
                                    modData.push({
                                      dailyDataresult,
                                      monthlyDataresult,
                                      radialdataresult,
                                      modpostData,
                                    });
                                    res.json(modData);
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
            }
          });
        }
      });
    } else if (mod_roleid === 1) {
      let modData = [];
      let modpostData = [];

      const radialdata =
        "SELECT `Agent name` as AgentName,sum(Approved) as Approved,sum(Rejected) as Rejected ,sum(Hold) as Hold,Date FROM meestdbcm2.agentByMedlyreport where `Agent Name`='" +
        mod_username +
        "' and YEAR(Date)=YEAR(now()) group by AgentName;";
      // const radialdata2 ="SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='"+mod_username+"' and Date = date(now())  ;" and Date >=date_sub(now(),interval 5 day)
      const dailyData =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "'and DATE(date)=CURDATE() order by Date";
      const modapprovepost =
        "select medly_post.*,posts_allocation.* from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid where allocation_status='Y' and status='1' and medly_post.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) order by moderated_at desc";
      const modholdpost =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='H' and medly_post.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) order by moderated_at desc";
      const modrejectpost =
        "select medly_post.*,posts_allocation.*,flags.flag_name from medly_post inner join posts_allocation on medly_post.post_id = posts_allocation.medly_postid join flags on flags.id=medly_post.flag_id where allocation_status='Y'and status='0' and medly_post.moderator_id='" +
        mod_id +
        "'and YEAR(moderated_at) = YEAR(CURRENT_DATE()) order by moderated_at desc";
      const monthlyData =
        "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "' group by month order by month limit 5";

      mysqlConnection.query(radialdata, (err, radialdataresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  mysqlConnection.query(
                    modapprovepost,
                    (err, modapprovepostresult) => {
                      if (err) console.log(err);
                      else {
                        mysqlConnection.query(
                          modholdpost,
                          (err, modholdpostresult) => {
                            if (err) console.log(err);
                            else {
                              mysqlConnection.query(
                                modrejectpost,
                                (err, modrejectpostresult) => {
                                  if (err) console.log(err);
                                  else {
                                    modpostData.push({
                                      modapprovepostresult,
                                      modholdpostresult,
                                      modrejectpostresult,
                                    });
                                    modData.push({
                                      dailyDataresult,
                                      monthlyDataresult,
                                      radialdataresult,
                                      modpostData,
                                    });
                                    res.json(modData);
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
            }
          });
        }
      });
    } else {
      res.status(402).json({ message: 'Wrong RoleID' });
    }
  } else if (key == 'CUSTOM') {
    console.log('custom', req.body);
    var starDate = req.body.date.start;
    var endDate = req.body.date.end;

    if (mod_roleid === 2) {
      let modData = [];
      let modpostData = [];

      const radialdata =
        "SELECT `Agent name` as AgentName,sum(Approved) as Approved,sum(Rejected) as Rejected ,sum(Hold) as Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='" +
        mod_username +
        "' and Date BETWEEN '" +
        starDate +
        "' AND '" +
        endDate +
        "' group by AgentName;";
      // const radialdata2 ="SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM meestdbcm2.agentBycmsreport where `Agent Name`='"+mod_username+"' and Date = date(now())  ;" and Date >=date_sub(now(),interval 5 day)
      const dailyData =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,Date FROM agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "'and Date BETWEEN '" +
        starDate +
        "' AND '" +
        endDate +
        "' order by Date";
      const modapprovepost =
        "select posts_cms.*,posts_allocation.* from posts_cms  join posts_allocation on posts_cms.myautoid=posts_allocation.post_id where allocation_status='Y' and status='1' and posts_cms.moderator_id='" +
        mod_id +
        "'and moderated_at BETWEEN '" +
        starDate +
        "' AND '" +
        endDate +
        "' order by moderated_at desc";
      const modholdpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='H' and posts_cms.moderator_id='" +
        mod_id +
        "'and moderated_at BETWEEN '" +
        starDate +
        "' AND '" +
        endDate +
        "' order by moderated_at desc";
      const modrejectpost =
        "select posts_cms.*,posts_allocation.*,flags.flag_name from posts_cms inner join posts_allocation on posts_cms.myautoid=posts_allocation.post_id join flags on flags.id=posts_cms.flag_id where allocation_status='Y'and status='0' and posts_cms.moderator_id='" +
        mod_id +
        "'and moderated_at BETWEEN '" +
        starDate +
        "' AND '" +
        endDate +
        "' order by moderated_at desc";

      const monthlyData =
        "select extract(MONTH from Date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentBycmsreport where `Agent Name` ='" +
        mod_username +
        "'and Date BETWEEN '" +
        starDate +
        "' AND '" +
        endDate +
        "' group by month order by month limit 5";

      mysqlConnection.query(radialdata, (err, radialdataresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  mysqlConnection.query(
                    modapprovepost,
                    (err, modapprovepostresult) => {
                      if (err) console.log(err);
                      else {
                        mysqlConnection.query(
                          modholdpost,
                          (err, modholdpostresult) => {
                            if (err) console.log(err);
                            else {
                              mysqlConnection.query(
                                modrejectpost,
                                (err, modrejectpostresult) => {
                                  if (err) console.log(err);
                                  else {
                                    modpostData.push({
                                      modapprovepostresult,
                                      modholdpostresult,
                                      modrejectpostresult,
                                    });
                                    modData.push({
                                      dailyDataresult,
                                      monthlyDataresult,
                                      radialdataresult,
                                      modpostData,
                                    });
                                    res.json(modData);
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
            }
          });
        }
      });
    } else if (mod_roleid === 1) {
      let modData = [];

      const todayPost =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,date as Date FROM meestdbcm2.agentByMedlyreport where `Agent Name`='" +
        mod_username +
        "' and Date = date(now())  ;";
      const radialdata2 =
        "SELECT `Agent name` as AgentName, Approved,Rejected,Hold,date as Date FROM meestdbcm2.agentByMedlyreport where `Agent Name`='" +
        mod_username +
        "' and Date = date(now())  ;";
      const dailyData =
        "SELECT `Agent Name` as AgentName,Approved,Rejected,Hold,date as Date FROM agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "' and Date >=date_sub(now(),interval 5 day) order by Date";
      const monthlyData =
        "select extract(MONTH from date) as month,sum(Approved) as Approved,sum(Rejected) as Rejected,sum(Hold) as Holded from agentByMedlyreport where `Agent Name` ='" +
        mod_username +
        "' group by month order by month limit 5";

      mysqlConnection.query(todayPost, (err, todayPostresult) => {
        if (err) console.log(err);
        else {
          mysqlConnection.query(dailyData, (err, dailyDataresult) => {
            if (err) console.log(err);
            else {
              mysqlConnection.query(monthlyData, (err, monthlyDataresult) => {
                if (err) console.log(err);
                else {
                  modData.push({
                    dailyDataresult,
                    monthlyDataresult,
                    todayPostresult,
                  });
                  res.json(modData);
                }
              });
            }
          });
        }
      });
    } else {
      res.status(402).json({ message: 'Wrong RoleID' });
    }
  }
};

exports.editmod = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  if (Object.keys(req.body).length === 0) {
    res.status(400).send('Request Body is missing');
  } else {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const useremail = req.body.email;
    const userpass = req.body.password;
    const modId = req.body.id;
    // const role=req.body.role;

    const sql =
      'update users set FName = ?,LName =?,username=?, email=?, password=? where id = ?';
    let uservalues = [
      firstName,
      lastName,
      username,
      useremail,
      userpass,
      modId,
    ];
    mysqlConnection.query(
      sql,
      [firstName, lastName, username, useremail, userpass, modId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send('User Updated Successfully!');
        }
      }
    );
  }
};

exports.rejectedmedlypost = (req, res) => {
  let userid = '';
  DetailsfromToken(req.token),
    (err, result) => {
      if (err) {
        res.json({ result: err });
      } else {
        userid = result.id;
      }
    };

  const sql =
    "SELECT a.*,b.comment,c.username,d.flag_name FROM medly_post a join posts_allocation b on a.post_id=b.medly_postid join users c on c.id=b.moderator_id join flags d on d.id=a.flag_id WHERE status='0' and allocation_status='Y' order by b.moderated_at desc";

  // const sql =
  // "SELECT * FROM medly_post a join posts_allocation b on a.post_id=b.medly_postid WHERE status='0' and allocation_status='Y'  order by b.moderated_at desc";
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
};
