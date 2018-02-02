/**
 * 如果遇到host修改成功，却依然访问失败的情况，可参见：http://www.cnblogs.com/hustskyking/p/hosts-modify.html
 */
var hostile = require('hostile')

exports.add = function (host) {
  return hostile.set('127.0.0.1', host)
}

exports.remove = function (host) {
  return hostile.remove('127.0.0.1', host)
}