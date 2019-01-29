const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit:10,
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'test',
  port: 3306
});

module.exports = {
  commonSqlObj: function (sql) {
    return new Promise((resolve, reject)=>{
      pool.query(sql,function (err,data) {
        if (err){
          reject(err);
        }
        resolve(data);
      })
    })
  }
};