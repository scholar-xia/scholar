const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gUserinfo = new Schema({
  level: { type: Number, default: '1' },
  money: { type: Number, default: '0' },
  vip: { type: Number, default: '0' }
}, { versionKey: false })

module.exports = gUserinfo
