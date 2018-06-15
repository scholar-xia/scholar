const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  md5: {
    type: String,
    required: true
  },
  sha1: {
    type: String,
    required: true
  }
}, { versionKey: false })
