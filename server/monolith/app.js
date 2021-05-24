const express = require('express')
const { connect, getDatabase } = require('./config/mongodb.js')
const route = require('./routes/')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

connect().then(status => {
  if (status) console.log('connect to database'); 
  else console.log('cannot connect to database');

  // console.log(getDatabase().collection('Movies').find().toArray());
  app.use(route)

  app.listen(PORT, _=> console.log('app run in port:', PORT))
})
