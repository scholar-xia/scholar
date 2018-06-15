const redis = require('redis')
const config = require('./../../config').redis

const client = redis.createClient(config.port, config.address)

// client.auth(config.pass)

module.exports = client
