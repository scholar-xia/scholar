const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoppingMall = new Schema({ // 商城
  propId: {type: Number}, // 道具ID
  propImgId: {type: Schema.Types.ObjectId}, // 道具图片ID
  propName: {type: String}, // 道具名称
  propNum: {type: Number}, // 道具数量
  propDetails: {type: String}, // 道具详情
  propClass: {type: Number}, // 道具类别(0=不在任何类别,1=头像类,2=道具类...)
  propLabel: {type: Number}, // 道具角标(0=没有角标,1=推荐,2=折扣...)
  money: {type: Number}, // 价格金币
  memberMoney: {type: Number}, // 会员价格金币
  upShelvesTime: {type: String}, // 道具上架时间,为空不上架
  downShelvesTime: {type: String} // 道具下架时间,为空不上架
}, { versionKey: false })

module.exports = shoppingMall
