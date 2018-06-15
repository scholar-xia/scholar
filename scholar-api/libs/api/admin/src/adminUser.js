const send = require('./../../../result').send

/**
 * limit 每页显示的数据条数
 * pages 总页数
 * skip 跳过的数据条数
 * sort 1:正序 -1:反序
 */
const adminquery = function (req, res, next) {
  const id = req.auth.id
  if (id) {
    __db.admin.findOne({_id: id}).then(info => {
      if (info) {
        var page = Number(req.body.page || 1)
        var limit = 10
        var pages = 0
        __db.users.count().then(count => {
          pages = Math.ceil(count / limit) // 计算总页数
          page = Math.min(page, pages) // 取值不能超过pages
          page = Math.max(page, 1) // 取值不能小于1
          var skip = (page - 1) * limit
          __db.users.find().sort({_id: 1}).limit(limit).skip(skip).then(users => {
            return send.result(res, next, 'json', users)
          })
        })
      }
    })
  }
}

/**
 * 删除普通用户
 */
const removeUser = function (req, res, next) {
  const id = req.auth.id
  if (id) {
    __db.admin.findOne({_id: id}).then(info => {
      if (info) {
        __db.users.findOne({user: req.body.user}).then(val => {
          if (val) {
            __db.users.remove({
              user: req.body.user
            }).then(() => { return send.result(res, next, 'json', {code: 200, msg: '删除用户成功!'}) })
          } else { return send.result(res, next, 'json', {code: 200, msg: '用户不存在!'}) }
        })
      }
    })
  }
}

/**
 * 管理员权限级别1>2>3>4>5
 */
const setAdmin = function (req, res, next) {
  const id = req.auth.id
  if (id) {
    __db.admin.findOne({_id: id}).then(info => {
      if (info) {
        __db.admin.findOne({user: req.body.user}).then(has => {
          if (has) { return send.result(res, next, 'json', {code: 200, msg: '用户已是管理员!'}) } else {
            __db.users.findOne({user: req.body.user}).then(uinfo => {
              if (info.level > req.body.level) { return send.result(res, next, 'json', {code: 202, msg: '你没有设置该级别的权限!'}) } else {
                let uadmin = new __db.admin({
                  user: uinfo.user,
                  password: uinfo.password
                })
                uadmin.save()
                return send.result(res, next, 'json', {code: 200, msg: '管理员设置成功!'})
              }
            })
          }
        })
      }
    })
  }
}

/**
 * 管理员权限级别1>2>3>4>5
 */
const removeAdmin = function (req, res, next) {
  const id = req.auth.id
  if (id) {
    __db.admin.findOne({_id: id}).then(info => {
      if (info) {
        __db.admin.findOne({user: req.body.user}).then(has => {
          if (has) {
            if (info.level < has.level) {
              __db.admin.remove({
                user: req.body.user
              }).then(() => { return send.result(res, next, 'json', {code: 200, msg: '删除管理员权限成功!'}) })
            } else { return send.result(res, next, 'json', {code: 200, msg: '你的管理员权限小于该用户!'}) }
          } else { return send.result(res, next, 'json', {code: 200, msg: '用户非管理员!'}) }
        })
      }
    })
  }
}

module.exports = {
  adminquery,
  removeUser,
  setAdmin,
  removeAdmin
}
