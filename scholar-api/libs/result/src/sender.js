// const mime = require('mime')

// function sendHtml (res, data) {
//   res.setHeader('Content-Type', `${mime.lookup('html')};charset=utf-8`)
//   res.end(data)
// }

// function sendJson (req, res, next) {
//   res.setHeader('Content-Type', mime.lookup('json'))
//   res.json(res.sender.data)
// }

// function sendText (req, res, next) {
//   res.setHeader('Content-Type', mime.lookup('text'))
//   res.end(res.sender.data)
// }

// function sendJpeg (req, res, next) {
//   res.setHeader('Content-Type', mime.lookup('jpg'))
//   res.json(res.sender.data)
// }

// function sendPng (req, res, next) {
//   res.setHeader('Content-Type', mime.lookup('png'))
//   res.json(res.sender.data)
// }

// function sender (req, res, next) {
//   const senderData = res.sender.data
//   const senderDataType = (res.sender.type || 'json').toLocaleLowerCase()
//   const requestDataType = (req.query.type || res.sender.type).toLocaleLowerCase()

//   res.status(res.sender.status || 200)

//   switch (senderDataType) {
//     case 'html':
//       sendHtml(req, senderData)
//       break
//     case 'jpg':
//     case 'jpeg':
//       switch (requestDataType) {
//         default:
//           sendJpeg(res, senderData)
//       }
//       break
//     case 'png':
//       switch (requestDataType) {
//         default:
//           sendPng(res, senderData)
//       }
//       break
//     case 'json':
//       switch (requestDataType) {
//         default:
//           sendJson(res, senderData)
//       }
//       break
//     default:
//       sendText(res, req, next)
//   }
// }

// module.exports = sender

const mime = require('mime')

const defData = {
  type: 'json',
  date: {
    result: 4000,
    errmsg: '无数据'
  }
}

function sendJson (req, res, next) {
  res.setHeader('Content-Type', mime.lookup('json'))
  res.json(res.sender.data)
}

function sendText (req, res, next) {
  res.setHeader('Content-Type', mime.lookup('text'))
  res.end(res.send.data)
}

function sendHtml (req, res, next) {
  res.setHeader('Content-Type', mime.lookup('html'))
  res.end(res.send.data)
}

function sendPng (req, res, next) {
  res.setHeader('Content-Type', mime.lookup('png'))
  res.end(res.send.data)
}

function sendJpg (req, res, next) {
  res.setHeader('Content-Type', mime.lookup('jpg'))
  res.end(res.send.data)
}

function sender (req, res, next) {
  res.sender = res.sender || defData

  switch (res.sender.type) {
    case 'json':
      sendJson(req, res, next)
      break
    case 'html':
      sendHtml(req, res, next)
      break
    case 'png':
      sendPng(req, res, next)
      break
    case 'jpg':
      sendJpg(req, res, next)
      break
    default:
      sendText(req, res, next)
  }
}

module.exports = sender
