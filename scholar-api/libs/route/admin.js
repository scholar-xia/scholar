const express = require('express')
const router = express.Router()

const sender = require('./../result').sender
const admin = require('./../api/admin')
const auth = require('./../auth/auth')

router.post('/', admin.adminLogin, sender)
router.post('/adminquery', auth.checker, admin.adminUser.adminquery, sender)
router.post('/removeUser', auth.checker, admin.adminUser.removeUser, sender)
router.post('/setAdmin', auth.checker, admin.adminUser.setAdmin, sender)
router.post('/removeAdmin', auth.checker, admin.adminUser.removeAdmin, sender)

module.exports = {
  url: '/admin',
  router
}
