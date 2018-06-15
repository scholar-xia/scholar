const logger = require('./../../logs')

module.exports = function (io) {
  var users = []
  io.on('connection', function (socket) {
    // console.log(socket.id, users.length)
    logger.info('socket.io正在链接')
    socket.join(socket.id, () => {
      let rooms = Object.keys(socket.rooms)
      console.log(rooms)
    })
    socket.on('login', function (user) {
      if (users.indexOf(user) > -1) {
        socket.emit('erruser', '用户已存在')
      } else {
        socket.user = user
        users.push(user)
        socket.emit('loginsuccess')
        io.sockets.emit('system', socket.user, users.length)
        logger.info(`${socket.user}已连接`)
      }
    })
    socket.on('postmsg', (msg) => {
      io.sockets.emit('newmsg', socket.user, msg)
    })
    socket.on('disconnect', function () {
      if (socket.user !== undefined) {
        users.splice(users.indexOf(socket.user), 1)
        socket.broadcast.emit('sysleaver', socket.user, users.length)
        logger.info(`${socket.user}的链接断开`)
      } else {
        socket.disconnect(true)
      }
    })
  })
}
