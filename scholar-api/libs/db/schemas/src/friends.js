const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friends = new Schema({
  uid: { type: Schema.Types.ObjectId, required: true }, // 用户id
  friendId: { type: Schema.Types.ObjectId, required: true }, // friendid
  friendNickName: { type: String, default: '' }, // 给friend取昵称
  groupName: { type: String, default: '我的好友' } // 给friend分组
}, { versionKey: false })

module.exports = friends
