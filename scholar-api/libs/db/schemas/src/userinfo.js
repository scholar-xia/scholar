const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userinfo = new Schema({
  uId: { type: Schema.Types.ObjectId }, // 用户id
  sex: { type: Number, default: 1 }, // 性别 1 = 男, 0 = 女
  level: { type: Number, default: 1 }, // 个人等级
  money: { type: Number, default: 0 }, // 个人金钱
  vip: { type: Number, default: 0 }, // 会员级别
  vipTime: { type: String }, // 会员剩余时间
  statistics: { type: String }, // 胜负统计百分比(退出时计算存储)
  win: { type: String }, // 胜场局数(退出时计算存储)
  negative: { type: String }, // 输场局数(退出时计算存储)
  personalizedSignature: { type: String } // 个性签名
}, { versionKey: false })

module.exports = userinfo
