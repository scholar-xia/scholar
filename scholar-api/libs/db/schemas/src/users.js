const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema({
  user: { type: String, required: true }, // 账号
  password: { type: String, required: true }, // 密码
  avatar: {type: Schema.Types.ObjectId}, // 头像id
  nickname: {type: String, required: true}, // 昵称
  friends: [{type: Schema.Types.ObjectId}], // 好友表id
  infoId: { type: Schema.Types.ObjectId } // 个人信息表id
}, { versionKey: false })

module.exports = Users
