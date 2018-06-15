const send = require('./../../result').send
const logger = require('./../../logs')

class Friend {
  addFriend (req, res, next) {
    const id = req.auth.id
    const fname = req.body.f_name
    if (id) {
      __db.users.findOne({_id: id}).then((info) => {
        if (info && info.nickname !== fname) {
          __db.users.findOne({nickname: fname}).then((finfo) => {
            if (finfo) {
              __db.friends.findOne({uid: info._id, friendId: finfo._id}).then((data) => {
                if (data !== null) { return send.result(res, next, 'json', {code: 202, msg: '已是好友'}) } else { // 双向保存好友
                  let me = new __db.friends({
                    uid: info._id,
                    friendId: finfo._id,
                    friendNickName: req.body.friendNickName || '',
                    groupname: req.body.groupname || '我的好友'
                  })
                  me.save()
                  let fme = new __db.friends({
                    uid: finfo._id,
                    friendId: info._id,
                    groupname: req.body.groupname || '我的好友'
                  })
                  fme.save()
                  __db.users.update({_id: id}, {$push: {friends: me._id}}, e => console.log(e, 3))
                  __db.users.update({_id: finfo._id}, {$push: {friends: fme._id}}, e => console.log(e, 2))
                  return send.result(res, next, 'json', {code: 200, msg: '添加好友成功'})
                }
              })
            } else { return send.result(res, next, 'json', {code: 201, msg: '添加的用户不存在'}) }
          })
        } else { return send.result(res, next, 'json', {code: 201, msg: 'id不存在或昵称不规范'}) }
      }).catch((e) => console.log(e, 1))
    } else { return send.result(res, next, 'json', {code: 201, msg: 'id不存在'}) }
  }
  removeFriend (req, res, next) {
    const id = req.auth.id
    const fname = req.body.f_name
    if (id) {
      __db.users.findOne({_id: id}).then((uinfo) => {
        if (uinfo && uinfo.nickname !== fname) {
          __db.users.findOne({nickname: fname}).then((finfo) => {
            __db.friends.findOne({uid: uinfo._id, friendId: finfo._id}).then((mdata) => {
              __db.friends.findOne({uid: finfo._id, friendId: uinfo._id}).then((fdata) => {
                if (mdata === null) { return send.result(res, next, 'json', {code: 202, msg: '你们不是好友'}) } else { // 双向删除好友
                  __db.users.update({_id: uinfo._id}, {$pull: {friends: mdata._id}}, e => console.log(e))
                  __db.users.update({_id: finfo._id}, {$pull: {friends: fdata._id}}, e => console.log(e))
                  __db.friends.remove({_id: mdata._id}, e => console.log(e))
                  __db.friends.remove({_id: fdata._id}, e => console.log(e))
                  return send.result(res, next, 'json', {code: 200, msg: '删除好友成功'})
                }
              })
            })
          })
        } else { return send.result(res, next, 'json', {code: 201, msg: 'id不存在或昵称不规范'}) }
      }).catch((e) => console.log(e, 1))
    } else { return send.result(res, next, 'json', {code: 201, msg: 'id不存在'}) }
  }
  displayFriend (req, res, next) {
    const id = req.auth.id
    if (id) {
      __db.friends.find({uid: id}).populate({ path: 'friendId', select: {}, model: 'users' }).then((docs) => {
        // console.log(docs)
        let friendList = []
        docs.map((doc, index) => {
          friendList.push({ uid: doc.friendId._id, nickname: (doc.friendNickName !== '') ? doc.friendNickName : doc.friendId.nickname, groupName: doc.groupName })
        })
        return send.result(res, next, 'json', {code: 200, friendList})
      })
    } else { return send.result(res, next, 'json', {code: 201, msg: 'id不存在'}) }
  }
  chatFriend (io) {
    var users = {}
    var uSocket = {}
    var usersCount = 0
    io.on('connection', (socket) => {
      logger.info('聊天连接建立')
      socket.on('starChat', (name) => {
        socket.name = name
        if (users[socket.name] !== undefined) {
          socket.emit('erruser', '已登陆')
        } else {
          users[socket.name] = socket.name
          uSocket[socket.name] = socket
          usersCount++
          io.sockets.emit('system', {name: users[socket.name], count: usersCount})
        }
      })
      socket.on('fromChat', function (from, to, msg) {
        if (users[to] !== undefined) {
          uSocket[to].emit('toChat', msg)
        } else if (users[from] !== undefined) {
          uSocket[from].emit('toChat', to + '不在线')
        } else {
          return false
        }
      })
      socket.on('disconnect', function () {
        if (users[socket.name]) {
          usersCount--
          socket.broadcast.emit('system', {name: users[socket.name], count: usersCount})
          logger.info(`${users[socket.name]}断开链接`)
          delete users[socket.name]
          delete uSocket[socket.name]
        } else {
          return false
        }
      })
    })
  }
}

const fri = new Friend()

module.exports = fri
