const http = require('http')
const socket = require('socket.io')
const app = require('./../libs/app')

const mongoose = require('mongoose')
const db = require('./../libs/db')
const logger = require('./../libs/logs')

const config = require('./../config')

// 注册全局 mongoose Promise
mongoose.Promise = global.Promise

mongoose.createConnection(config.mongodb.url, {
  useMongoClient: true
}).then(conn => {
  global.__db = db(conn)
}, error => {
  logger.error(error)
  process.exit(1)
})

const server = http.createServer(app)
const port = 3000
server.listen(port, '0.0.0.0', () => {
  logger.info('---------------------------------')
  logger.info(`服务器启动，监听${port}端口`)
})

const io = socket.listen(server)
// const sockets = require('./../libs/api/socketIo/socketio')
const sockets = require('./../libs/api/friend').chatFriend
sockets(io)
