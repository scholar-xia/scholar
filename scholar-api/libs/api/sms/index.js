const SMSClient = require('@alicloud/sms-sdk')

const accessKeyId = 'LTAI9LoIlNc7DqsG'
const secretAccseeKey = '3139fuojENUrfykQlna2J2QqOWjSWo'

module.exports = function () {
  const SMSClients = new SMSClient({accessKeyId, secretAccseeKey})
  SMSClients.sendSMS({
    PhoneNumbers: '18715028953',
    SignName: '测试',
    TemplateCode: 'SMS_77535025',
    TemplateParam: '{"code":"12345"}'
  }).then(function (res) {
    let Code = res
    if (Code === 'OK') {
      console.log(res)
    }
  }, function (e) {
    console.log(e)
  })
}
