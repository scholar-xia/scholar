const send = require('./../../../result').send
const crypto = require('./../../../../utils').crypto
const redis = require('./../../../redis')
const tokenkey = require('./../../../../config').tokenkey.key
const moment = require('moment')
const jwt = require('jsonwebtoken')
var now = moment()

const valid = {
  register: req => !!(
    req.body.user &&
    req.body.pass
  )
}

module.exports = function (req, res, next) {
  if (valid.register(req)) {
    __db.users.findOne({
      user: req.body.user,
      password: crypto.md5(req.body.pass)
    }).then(function (info) {
      if (!info) {
        return send.result(res, next, 'json', {msg: '账号或密码错误', count: 1})
      } else {
        let token = jwt.sign({
          iss: 'scholarx',
          sub: info._id,
          iat: now.valueOf(),
          exp: now.add(3600, 's').valueOf()
        }, tokenkey)

        redis.set(`token-${crypto.sha1(token)}`, JSON.stringify({
          id: info._id,
          createtime: now.valueOf()
        }), 'EX', 3600, () => {
          return send.result(res, next, 'json', {msg: '登陆成功', token})
        })
      }
    })
  }
}
