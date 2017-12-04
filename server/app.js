const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//IMPORT FILE
const index = require('./routes/index')
const user = require('./routes/users')
const barang = require('./routes/barang')
const upload = require('./routes/upload')
const kredit = require('./routes/kredit')
const customer = require('./routes/customer')

const uri = `mongodb://rusligani:asdfgh123#@cluster0-shard-00-00-ntai3.mongodb.net:27017,cluster0-shard-00-01-ntai3.mongodb.net:27017,cluster0-shard-00-02-ntai3.mongodb.net:27017/waskatPegadaian?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`

mongoose.connect(uri, {
  useMongoClient: true
})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'mongodb connection error'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/user', user)
app.use('/barang', barang)
app.use('/upload', upload)
app.use('/kredit', kredit)
app.use('/customer', customer)

app.listen(process.env.PORT || 3000)

module.exports = app

