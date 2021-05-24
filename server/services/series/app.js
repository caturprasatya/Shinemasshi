const express = require('express')
const { connect } = require('./config/mongodb.js')
const route = require('./routes/')
const errHandler = require('./middlewares/errHandler')

const app = express()
const PORT = process.env.PORT || 4002

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

connect().then(status => {
  if (status) console.log('connect to database'); 
  else console.log('cannot connect to database');

  app.use(route)
  app.use(errHandler)

  app.listen(PORT, _=> console.log('app run in port:', PORT))
})
