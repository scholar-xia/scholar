const redis = require('./src/redis')
const log4js = require('./src/log4js')
const mongodb = require('./src/mongodb')
const tokenkey = require('./src/tokenkey')

module.exports = {
  redis,
  log4js,
  mongodb,
  tokenkey
}
