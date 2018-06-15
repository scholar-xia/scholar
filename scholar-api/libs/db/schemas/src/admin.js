const mongoose = require('mongoose')
const Schema = mongoose.Schema

const admin = new Schema({
  user: {type: String, required: true}, // 管理员账号
  password: {type: String, required: true}, // 管理员密码
  level: {type: Number, required: true} // 管理员级别1>2>3>4>5
}, { versionKey: false })

module.exports = admin
