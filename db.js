const homedir = require("os").homedir();
const home = process.env.HOME || homedir;
const fs = require("fs");
const p = require("path");
const dbPath = p.join(home, ".todo");

const db = {
  read(path = dbPath) {
    //如果传入path就用path，如果不传就默认用dbPath
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (error, data) => {
        //data是返回值，返回文件内容
        if (error) return reject(error);
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (error2) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(path, string, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  },
};
module.exports = db;
