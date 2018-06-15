// import { Schema } from 'mongoose'

const schemas = require('./schemas')
// const mongoose = require('mongoose')

module.exports = conn => {
  return {
    users: conn.model('users', schemas.users),
    userinfo: conn.model('userinfo', schemas.userinfo, 'userinfo'),
    cdn: conn.model('cdn', schemas.cdn),
    u_file: conn.model('u_file', schemas.ufile),
    g_users: conn.model('g_users', schemas.gUsers),
    admin: conn.model('admin', schemas.admin, 'admin'),
    fetcharticle: conn.model('fetcharticle', schemas.admin, 'fetcharticle'),
    gUserinfo: conn.model('gUserinfo', schemas.gUserinfo, 'gUserinfo'),
    friends: conn.model('friends', schemas.friends, 'friends')
  }
}

// const mongo = {}

// for (schema of Object.keys(schemas)) {
//   mongoose.model(schema, schemas[schema])
//   mongo[schema] = mongoose.model(schema)
// }

// module.exports = mongo
