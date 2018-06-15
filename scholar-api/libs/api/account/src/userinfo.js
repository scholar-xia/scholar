const send = require('./../../../result').send

/**
 *显示信息
 */
function displayInformation (req, res, next) {
  const id = req.auth.id
  if (id) {
    __db.users.findOne({
      _id: id
    }).then(info => {
      if (info) {
        __db.userinfo.findOne({_id: info.info})
        let userinfo = {
          user: info.user
        }
        return send.result(res, next, 'json', userinfo)
      } else { return send.result(res, next, 'json', {code: 302, msg: '信息错误'}) }
    })
  }
}

/**
 *修改信息
 */
function changeInformation (req, res, next) {
  const id = req.auth.id
}

module.exports = {
  displayInformation,
  changeInformation
}
