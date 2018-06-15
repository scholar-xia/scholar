const crypto = require('./../../../../utils').crypto
const send = require('./../../../result').send
const path = require('path')
const fs = require('fs')

module.exports = function (req, res, next) {
  const id = req.auth.id
  const imgdata = req.body.imgdata
  const md5 = crypto.md5(imgdata)
  const sha1 = crypto.sha1(imgdata)
  const ext = req.body.imgext // 获取文件后缀

  __db.cdn.findOne({md5, sha1}).then(data => {
    if (data) {
      __db.u_file.findOne({filename: md5 + sha1}).then(data => {
        __db.users.update({_id: data.userid}, {avatar: data._id}, e => {
          console.log(e)
        })
      })
    } else {
      __db.users.findOne({_id: id}).then(user => {
        if (user) {
          var cdndata = new __db.cdn({
            md5,
            sha1
          })
          cdndata.save()

          var filedata = new __db.u_file({
            userid: user._id,
            cdnid: cdndata._id,
            filename: md5 + sha1,
            ext: ext
          })
          filedata.save()

          __db.users.update({_id: id}, {avatar: filedata._id}, e => {
            console.log(2)
          })

          fs.writeFile(path.join(__dirname, `./../../../../img/${md5}${sha1}`), imgdata, 'base64', e => {
            console.log(3)
          })
        }
      })
    }
  })
}
