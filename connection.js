const mysql = require('mysql');

const mysqlConnection = mysql.createPool({
  //LIVE host: "meestdatabase.ccul6djzg5wl.ap-south-1.rds.amazonaws.com",
  host: 'meestdbpy.ccul6djzg5wl.ap-south-1.rds.amazonaws.com',
  user: 'meest1311',
  password: 'Meest@1311user#',
  database: 'meestdbcm2',
  pool: {
    max: 10,
    min: 0,
    acquire: 20050,
    idle: 10000,
  },
});

module.exports = mysqlConnection;
