const redis = require('./../redis')
const crypto = require('./../../utils').crypto

const gAuth = function (req, res, next) {}

Object.assign(gAuth, {
  checker: function (req, res, next) {
    const [_token] = [req.query.token || req.body.token || req.headers['x-access-token']]
    Object.assign(req, {
      auth: {
        mode: 'secret',
        pass: false,
        id: null
      }
    })
    redis.get(`token-${crypto.sha1(_token)}`, (e, value) => {
      if (value) {
        value = JSON.parse(value)
        req.auth.pass = true
        req.auth.id = value.id
        next()
      } else {
        return res.send({msg: 'token已过期!'})
      }
    })
  }
})

module.exports = gAuth
