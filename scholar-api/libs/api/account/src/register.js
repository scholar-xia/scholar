const send = require('./../../../result').send
const crypto = require('./../../../../utils').crypto
const jwt = require('jsonwebtoken')
const redis = require('./../../../redis')
const tokenkey = require('./../../../../config').tokenkey.key
const moment = require('moment')
var now = moment()

const valid = {
  register: req => !!(
    req.body.user &&
    req.body.pass &&
    req.body.rpass &&
    req.body.nickname
  )
}

module.exports = function (req, res, next) {
  if (valid.register(req) && req.body.pass === req.body.rpass) {
    __db.users.findOne({
      user: req.body.user
    }).then(function (userinfo) {
      if (userinfo) { return send.result(res, next, 'json', {result: 1, msg: '该用户已存在'}) } else {
        __db.users.findOne({nickname: req.body.nickname}).then(has => {
          if (has) { return send.result(res, next, 'json', {result: 1, msg: '该昵称已存在'}) } else {
            let user = new __db.users({
              user: req.body.user,
              password: crypto.md5(req.body.pass),
              nickname: req.body.nickname
            })
            user.save()

            let usinfo = new __db.userinfo({
              uId: user._id,
              sex: 1,
              level: 1,
              money: 0,
              vip: 0,
              statistics: 0,
              win: 0,
              negative: 0,
              personalizedSignature: ''
            })
            usinfo.save()
            __db.users.update({_id: user._id}, {$push: {infoId: usinfo._id}}, (e) => console.log(e))

            let token = jwt.sign({
              iss: 'scholarx',
              sub: user._id,
              iat: now.valueOf(),
              exp: now.add(3600, 's').valueOf()
            }, tokenkey)

            redis.set(`token-${crypto.sha1(token)}`, JSON.stringify({
              id: user._id,
              createtime: now.valueOf()
            }), 'EX', 3600, () => { return send.result(res, next, 'json', {result: 0, msg: '用户注册成功', token}) })
          }
        })
      }
    })
  } else { return send.result(res, next, 'json', {result: 1, msg: '信息输入错误'}) }
}
