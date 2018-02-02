var http = require('http');
var httpProxy = require('http-proxy');

module.exports = function (opts, success) {
  return httpProxy.createProxyServer(opts).listen(80, success)
}