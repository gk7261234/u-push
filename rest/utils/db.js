const mysql = require('mysql');
const config = require('../../config/common');

const dbConfig = config[process.env.NODE_ENV||'development']['db'];
const pool = mysql.createPool(dbConfig);

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