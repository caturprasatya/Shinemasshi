const express = require('express')
const route = require('./routes/')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(route)

app.listen(PORT, _=> console.log('app run in port:', PORT))
