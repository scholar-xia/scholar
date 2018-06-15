const send = require('./../../../result').send
const redis = require('./../../../redis')
const crypto = require('./../../../../utils').crypto
const tokenkey = require('./../../../../config').tokenkey.key

const joi = require('joi')
const moment = require('moment')
const jwt = require('jsonwebtoken')

const now = moment()

module.exports = function (req, res, next) {
  const Ushema = joi.string().regex(/^1[3|4|5|8][0-9]\d{4,8}$/).length(11).required()
  const Pshema = joi.string().alphanum().min(6).max(32).required()

  if (Ushema.validate(req.body.user).error === null) {
    if (Pshema.validate(req.body.password).error === null) {
      __db.g_users.findOne({
        user: req.body.user,
        password: crypto.md5(req.body.password)
      }).then(info => {
        if (info) {
          let token = jwt.sign({
            iss: 'game',
            sub: info._id,
            iat: now.valueOf(),
            exp: now.add(3600, 's').valueOf()
          }, tokenkey)

          redis.set(`token-${crypto.sha1(token)}`, JSON.stringify({
            id: info._id,
            createtime: now.valueOf()
          }), 'EX', 3600, () => {
            return send.result(res, next, 'json', {code: 200, msg: '欢迎登陆!', token})
          })
        } else {
          return send.result(res, next, 'json', {code: 23, msg: '账号或密码输入错误!'})
        }
      })
    } else {
      return send.result(res, next, 'json', {code: 22, msg: '账号密码格式错误!'})
    }
  } else {
    return send.result(res, next, 'json', {code: 21, msg: '手机号码格式错误!'})
  }
}
