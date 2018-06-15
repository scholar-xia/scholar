const send = require('./../../../result').send

module.exports = function (req, res, next) {
  const id = req.auth.id
  if (id) {
    __db.g_users.findOne({
      _id: id
    }).then(info => {
      if (info) {
        let data = info.user
        return send.result(res, next, 'json', {code: 30, data})
      } else {
        return send.result(res, next, 'json', {code: 32, msg: '信息错误!'})
      }
    })
  } else {
    return send.result(res, next, 'json', {code: 31, msg: '没有权限!'})
  }
}
