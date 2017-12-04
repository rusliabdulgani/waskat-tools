const Customer = require('../models/customer')

let getAllCustomer = (req, res) => {
  Customer.find()
  .then(response => {
    console.log('get all Customer: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let getCustomerById = (req, res) => {
  Customer.findById(req.params.id)
  .then(response => {
    console.log('get Customer by id: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let inputCustomer = (req, res) => {
  Customer.create({
    nama: req.body.nama,
    alamat: req.body.alamat,
    email: req.body.email
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let editCustomer = (req, res) => {
  Customer.update({
    _id: req.params.id
  }, {
    nama: req.body.nama,
    alamat: req.body.alamat,
    email: req.body.email
  })
  .then(response => {
    console.log('edit Customer: ', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let deleteCustomer = (req, res) => {
  Customer.remove({
    _id: req.params.id
  })
  .then(response => {
    console.log('delete Customer', response)
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  getAllCustomer,
  getCustomerById,
  inputCustomer,
  editCustomer,
  deleteCustomer
}