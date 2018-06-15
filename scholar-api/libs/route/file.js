const express = require('express')
const router = express.Router()

const sender = require('./../result').sender
const file = require('./../api/file')
const auth = require('./../auth/auth')

router.post('/gfile', auth.checker, file.gFile, sender)
router.post('/sfile', auth.checker, file.sFile, sender)

module.exports = {
  url: '/file',
  router
}
