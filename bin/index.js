#!/usr/bin/env node

var chalk = require('chalk');
var program = require('commander');
var exitHook = require('exit-hook');
var host = require('./lib/host');
var createProxyServer = require('./lib/create-proxy-server');

program
  .version(require('./package.json').version, '-v, --version')
  .description('一个简单的反向代理cli（切记使用root权限运行，因为需要权限修改host）')
  .usage('<host> <port>')
  .on('--help', function () {
    var log = function (msg) {
      console.log(chalk.green(msg || ''));
    }
    log();
    log('  Examples:');
    log();
    log('    $ sudo proxy www.example.com 8080');
    log();
  })

program.parse(process.argv);
if (!program.args.length) {
  program.help();
}

var args = {
  host: program.args[0],
  port: program.args[1]
};

host.add(args.host);
exitHook(function(){ host.remove(args.host); });

createProxyServer({
  target: 'http://localhost:' + args.port
}, function () {
  console.log(chalk.green(args.host + ' => ' + 'localhost:' + args.port));
  console.log(chalk.green('proxy server is running..'));
});
