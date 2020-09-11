const SMSClient = require('@alicloud/sms-sdk')

const accessKeyId = 'accessKeyId'
const secretAccseeKey = 'secretAccseeKey'

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
