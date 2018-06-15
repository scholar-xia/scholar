const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  userid: {
    type: Schema.Types.ObjectId
  },
  cdnid: {
    type: Schema.Types.ObjectId
  },
  filename: {
    type: String
  },
  ext: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})
