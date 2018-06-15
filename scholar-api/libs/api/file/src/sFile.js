const [fs, path] = [require('fs'), require('path')]
const mime = require('mime')
const send = require('./../../../result').send

module.exports = function (req, res, next) {
  const id = req.auth.id
  if (id) {
    __db.users.findOne({_id: id}).then(user => {
      user ? __db.u_file.findOne({_id: user.avatar}).then(file => {
        file ? __db.cdn.findOne({_id: file.cdnid}).then(doc => {
          doc ? sendFile(doc, file.filename, file.ext) : send.result(res, next, 'json', {msg: '错误', count: 1})
        }).catch(e => console.log(e)) : send.result(res, next, 'json', {msg: '错误', count: 2})
      }).catch(e => console.log(e)) : send.result(res, next, 'json', {msg: '错误', count: 3})
    }).catch(e => console.log(e))

    const sendFile = (doc, name, ext) => {
      fs.readFile(path.join(__dirname, `./../../../../img/${doc.md5}${doc.sha1}`), (e, buffer) => {
        if (e) {
          console.log(e)
        } else {
          switch (ext) {
            case 'png':
              const data = Buffer.from(buffer, 'base64')
              res.setHeader('Content-Type', mime.lookup('png'))
              res.setheader('Content-Length', data.length)
              res.end(data)
              break
            case 'jpg':
            default:
              res.setHeader('Content-Type', mime.lookup('jpg'))
              res.end(Buffer.from(buffer, 'base64'))
          }
        }
      })
    }
  }
}
