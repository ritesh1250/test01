//This algoritham is for dynamic allocation of the posts initaly developed for post_cms table
// Now the initial allocation handled by the database trigger.

const mysqlConnection = require('../connection');
const mysqlConnection1 = require('../connection');
let allpost = [];
//SELECT count(*) FROM meestdbcm2.posts_cms where allocation_status='N';
const postallocation =
  "SELECT myautoid FROM posts_cms WHERE allocation_status='N'ORDER BY createdAt DESC";
const allvalidusers =
  "select * from meestdbcm2.users where deleted='0' and isDisabled='0' and isOnline=true";
const allocatepost =
  'INSERT INTO posts_allocation (moderator_id,post_id) VALUES ?';
const chngestatus =
  "update posts_cms set allocation_status = 'Y' where myautoid=?";

const posts = function (postallocation, callback) {
  mysqlConnection.query(postallocation, (err, postresults) => {
    if (err) {
      callback(err);
    } else {
      callback(postresults);
    }
  });
};

const allusers = function (allvalidusers, callback) {
  mysqlConnection.query(allvalidusers, (err, userresults) => {
    if (err) {
      callback(err);
    } else {
      callback(userresults);
    }
  });
};
// var i=0;
// var j=0;
posts(postallocation, function (postresults) {
  if (postresults.length == '0') {
    console.log('No Post to allocate');
  }
  allusers(allvalidusers, function (userresults) {
    //console.log(postresults.length);
    //Here to make it short number is fixed that is 4, Change it to the length of the array i.e  postresults
    for (i = 0; i < 4; ) {
      for (j = 0; j < userresults.length; j++) {
        if (i < 4) {
          // console.log(i);
          let aloocatevalues = [[userresults[j].id, postresults[i].myautoid]];
          mysqlConnection.query(
            allocatepost,
            [aloocatevalues],
            (err, allocationesults) => {
              if (err) {
              } else {
                //console.log(allocationesults);
                //callback(allocationesults);
              }
            }
          );
          console.log(postresults[i].myautoid, userresults[j].id);
          mysqlConnection.query(
            chngestatus,
            [postresults[i].myautoid],
            (err, chngestatusres) => {
              if (err) {
                console.log(err);
              } else {
                //console.log(chngestatusres);
                //callback(allocationesults);
              }
            }
          );
          i++;
        } else {
          break;
        }
      }
    }
    mysqlConnection.end();
  });
});
