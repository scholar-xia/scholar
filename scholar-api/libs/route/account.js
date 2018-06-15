const express = require('express')
const router = express.Router()

const sender = require('./../result').sender
const account = require('./../api/account')
const auth = require('./../auth/auth')

const friend = require('./../api/friend')

router.post('/login', account.login, sender)
router.post('/info', auth.checker, account.userinfo.displayInformation, sender)
router.post('/register', account.register, sender)
router.post('/addfriend', auth.checker, friend.addFriend, sender)
router.post('/removefriend', auth.checker, friend.removeFriend, sender)
router.post('/displayfriend', auth.checker, friend.displayFriend, sender)
// router.post('/chatFriend', auth.checker, friend.chatFriend, sender)

module.exports = {
  url: '/account',
  router
}
