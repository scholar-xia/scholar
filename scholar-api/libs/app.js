const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const app = express()

// const crl = require('./api/crawler/crawler')
// app.use(function () {
//   crl()
// })

// 解决跨域
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,x-access-token,token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Max-Age', '86400')
  next()
})

// POST请求解析body，limit限制请求大小
// 当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型
app.use(bodyParser.json({limit: '2mb'}))
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}))

app.use(express.static('static'))

fs.readdirSync(path.join(__dirname, './route'))
  .forEach(file => {
    const ignore = ['.DS_store'].indexOf(file) === -1
    const suffix = path.extname(file).toString().toLocaleLowerCase() === '.js'
    if (ignore && suffix) {
      const route = require('./route/' + file)
      app.use(`/api/1.0${route.url}`, route.router)
    }
  })

module.exports = app
