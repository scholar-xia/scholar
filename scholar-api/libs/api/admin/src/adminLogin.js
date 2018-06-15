const send = require('./../../../result').send
const crypto = require('./../../../../utils').crypto
const redis = require('./../../../redis')
const tokenkey = require('./../../../../config').tokenkey.key

const joi = require('joi')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const now = moment()

module.exports = function (req, res, next) {
  const myschema = joi.object({
    user: joi.string().alphanum().min(2).max(20).required(),
    pass: joi.string().alphanum().min(6).max(32).required()
  }).with('user', 'pass')

  if (myschema.validate({user: req.body.user, pass: req.body.password}).error === null) {
    __db.admin.findOne({user: req.body.user, password: crypto.md5(req.body.password)}).then(info => {
      if (info) {
        let token = jwt.sign({
          iss: 'admin',
          sub: info._id,
          iat: now.valueOf(),
          exp: now.add(3600, 's').valueOf()
        }, tokenkey)

        redis.set(`token-${crypto.sha1(token)}`, JSON.stringify({
          id: info._id,
          createtime: now.valueOf()
        }), 'EX', 3600, () => { return send.result(res, next, 'json', {code: 200, msg: `欢迎你，管理员${info.user}!`, token}) })
      } else { return send.result(res, next, 'json', {code: 202, msg: '账号或密码错误!'}) }
    })
  } else { return send.result(res, next, 'json', {code: 204, msg: '账号或密码格式错误!'}) }
}
