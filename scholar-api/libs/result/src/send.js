module.exports = {
  result: function (res, next, type, data) {
    res.staus = 200
    res.sender = {
      type,
      data
    }
    return next()
  },
  err: function (res, next) {
    res.staus = 500
    res.sender = {
      type: 'json',
      data: {
        errmsg: '服务器出错'
      }
    }
    return next()
  }
}
