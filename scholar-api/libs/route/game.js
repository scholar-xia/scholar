const express = require('express')
const router = express.Router()

const sender = require('./../result').sender
const game = require('./../api/game')
const gAuth = require('./../auth/gAuth')
const sms = require('./../api/sms')

router.post('/Gregister', game.Gregister, sender)
router.post('/Glogin', game.Glogin, sender)
router.post('/Ginfo', gAuth.checker, game.Guserinfo, sender)
router.get('/sms', sms, sender)

module.exports = {
  url: '/game',
  router
}
