const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fetcharticle = new Schema({
  title: {type: String},
  time: {type: Number, default: ''},
  link: {type: String, default: ''},
  text: {type: String, default: ''},
  img: {type: String}
}, { versionKey: false })

module.exports = fetcharticle
