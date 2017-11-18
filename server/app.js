const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

//IMPORT FILE
const index = require('./routes/index')
const user = require('./routes/users')

const uri = `mongodb://rusligani:asdfgh123#@cluster0-shard-00-00-ntai3.mongodb.net:27017,cluster0-shard-00-01-ntai3.mongodb.net:27017,cluster0-shard-00-02-ntai3.mongodb.net:27017/waskatPegadaian?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`

MongoClient.connect( 'mongodb://localhost/waskatapp', (err, db) => {
  err ? console.log('can\'t connect to database', err) : console.log('database connected')
}) 

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/user', user)

app.listen(process.env.PORT || 3000)

module.exports = app

