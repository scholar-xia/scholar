const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gUsers = new Schema({
  user: { type: Number, required: true },
  password: { type: String, required: true },
  avatar: {type: Schema.Types.ObjectId},
  info: { type: Schema.Types.ObjectId }
}, { versionKey: false })

module.exports = gUsers
