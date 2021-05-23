const { write } = require("../db");

// 声明jest的假模块，用来测试
const fs = jest.genMockFromModule("fs");
// 这是真的fs
const _fs = jest.requireActual("fs");

Object.assign(fs, _fs);

// 在模块上加x
let readMocks = {};
fs.setReadFileMock = (path, error, data) => {
  //只要读取path，就返回两个对应参数
  readMocks[path] = [error, data];
};

// options可以不传，直接：fs.readFile('xxx',fn)
fs.readFile = (path, options, callback) => {
  if (callback === undefined) {
    // 如果没传options，那么第二个参数就是callback
    callback = options;
  }
  if (path in readMocks) {
    // 如果发现路径被mock过，就不用真正的readFile
    //把mock对应的path中的参数依次放进去
    callback(...readMocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
};

let writeMocks = {};

fs.setWriteFileMock = (path,fn)=>{
  writeMocks[path]=fn
}

fs.writeFile = (path, data, options, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback);
  } else {
    _fs.writeFile(path, data, options, callback);
  }
};

fs.clearMocks =()=>{
  readMocks = {}
  writeMocks = {}
}

module.exports = fs;
