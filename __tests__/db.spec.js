const db = require("../db.js");
// 这是真的fs
const fs = require("fs");
// mock之后,这是假的fs
jest.mock('fs');

describe("db", () =>{
    afterEach(()=>{
        fs.clearMocks()
    })
  it("can read", async () =>  {
    const data = [{title:'hi',done:true}]
    //error是空，内容是：data
    //fs提供设置对应路径的error和content的函数
    fs.setReadFileMock('/xxx',null,JSON.stringify(data))
    // 读取文件时会返回list
    const list = await db.read('/xxx')
    //空数组本不等于空数组，因为地址不同，strict：严格意义上相等，比内容不比地址
    expect(list).toStrictEqual(data)
  });
  it("can write",async ()=>{
      let fakeFile = ''
    //   fs.setWriteFileMock('/yyy',(path,data)=>{
    //       fakeFile = data
    //       callback(null)
    //   }) 
    fs.setWriteFileMock('/xyz',(path,data,callback)=>{
        fakeFile = data
        callback(null)
    })
      const list = [{title:'见肖战',done:false}]
      await db.write(list,'/xyz')
      expect(fakeFile).toBe(JSON.stringify(list))
  })
});