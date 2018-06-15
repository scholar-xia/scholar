const send = require('./../../../result').send
const redis = require('./../../../redis')
const crypto = require('./../../../../utils').crypto
const tokenkey = require('./../../../../config').tokenkey.key

const joi = require('joi')
const moment = require('moment')
const jwt = require('jsonwebtoken')

const now = moment()

module.exports = function (req, res, next) {
  const Ushema = joi.string().regex(/^1[3|4|5|7|8][0-9]\d{4,8}$/).length(11).required()
  const Pshema = joi.string().alphanum().min(6).max(32).required() // 密码只能0-9,A-Z,a-z
  const phoneCode = '1234' // 手机验证码

  if (Ushema.validate(req.body.user).error === null) {
    if (req.body.password === req.body.rpassword && Pshema.validate(req.body.password).error === null) {
      if (phoneCode === req.body.phoneCode) {
        __db.g_users.findOne({
          user: req.body.user
        }).then(user => {
          if (user) {
            return send.result(res, next, 'json', {code: 1, msg: '该账号已存在!'})
          } else {
            var users = new __db.g_users({
              user: req.body.user,
              password: crypto.md5(req.body.password)
            })
            users.save()

            let token = jwt.sign({
              iss: 'game',
              sub: users._id,
              iat: now.valueOf(),
              exp: now.add(3600, 's').valueOf()
            }, tokenkey)

            redis.set(`token-${crypto.sha1(token)}`, JSON.stringify({
              id: users._id,
              createtime: now.valueOf()
            }), 'EX', 3600, () => {
              return send.result(res, next, 'json', {code: 0, msg: '注册成功!', token})
            })
          }
        })
      } else {
        return send.result(res, next, 'json', {code: 2, msg: '手机验证码错误!'})
      }
    } else {
      return send.result(res, next, 'json', {code: 2, msg: '密码格式不正确!'})
    }
  } else {
    return send.result(res, next, 'json', {code: 1, msg: '手机号码格式不正确!'})
  }
}
