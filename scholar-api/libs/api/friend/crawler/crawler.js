const http = require('http')
const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request')
const url = 'http://ah.sina.com.cn/'

function fetchPage (x) {
  startRequest(x)
}

function startRequest (x) {
  http.get(x, function (res) {
    var html = ''
    res.setEncoding('utf-8')
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('end', function () {
      var $ = cheerio.load(html)
      // $('#DFZ_Channel_block_01_0 li').length
      for (let i = 0; i < 2; i++) {
        var newsitem = {
          title: $('#DFZ_Channel_block_01_0 li .news-text h2').eq(i).text().trim(),
          newstime: $('#DFZ_Channel_block_01_0 li .news-text p span').eq(i).text(),
          link: $('#DFZ_Channel_block_01_0 li .news-text h2 a').eq(i).attr('href'),
          imgurl: $('#DFZ_Channel_block_01_0 li .news-img img').eq(i).attr('src')
        }
        saveText(newsitem.link, newsitem.title, newsitem.newstime, newsitem.imgurl)
      }
    })
  })
}

function saveText (urls, textName, time, imgurl) {
  http.get(urls, function (res) {
    var html = ''
    res.setEncoding('utf-8')
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('data', function () {
      var $ = cheerio.load(html)
      $('#artibody .article-body p').each(function (index, item) {
        var word = $(this).text()
        var xy = word.substring(0, 2).trim()

        if (xy === '') {
          word = word + '\n'
          fs.appendFile('./files/' + textName + '.txt', word, 'utf-8', function (err) {
            if (err) {
              console.log(err)
            }
          })
          var imgfilename = textName + '.jpg'
          request.head(imgurl, function (err, res, body) {
            if (err) {
              console.log(err)
            }
          })
          request(imgurl).pipe(fs.createWriteStream('./img/' + imgfilename))
        }
      })
    })
  })
}

module.exports = fetchPage(url)
