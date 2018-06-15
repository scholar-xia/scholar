const joi = require('joi')
// const schema = {
//   a: joi.number()
// }
// const value = {
//   a: 'asd'
// }
// joi.validate(value, schema, (err, value) => {
//   console.log(err)
//   console.log(value)
// })

const MeSchema = joi.object({
  username: joi.string().min(2).max(20).required(),
  isA: joi.boolean(),
  Aval: joi.number()
})
joi.validate({username: '夏夜'}, MeSchema, (e, v) => {
  console.log(e)
  console.log(v)
})
