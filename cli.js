#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')

program
  .version(pkg.version)
program
  .option('-x, --xxx', 'what the x')
program
  .command('add')
  .description('add a task')
  .action((...arg) => {
    const words = arg.slice(0,-1).join(' ')//用空格合成一句话
    api.add(words);
  });
program
  .command('clear')
  .description('clear all task')
  .action(() => {
      api.clear()
  });
program.parse(process.argv);

if(process.argv.length === 2){
  api.showAll()
}