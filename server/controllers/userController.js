const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(10)

//IMPORT MODEL
const User = require('../models/users')

require('dotenv').config()

let getAllUsers = function (req, res) {
  User.find().exec(function (err, response) {
    if (!err) {
      res.send(response)
    } else {
      res.send(err)
    }
  })
}

let getUserById = (req, res) => {
  User.findById(req.params.id)
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let createUser = (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, salt)
  User.create({
    username: req.body.username,
    id: req.body.id,
    email: req.body.email,
    password: hash,
    role: req.body.role
  })
  .then(response => {
    console.log('response create user: ', response)
    res.send(response)
  })
  .catch(err => {
    console.log('error create user: ', err)
    res.send(err)
  })
}

let editUser = (req, res) => {
  User.update({
    _id: req.params.id
  }, {
    username: req.body.username,
    id: req.body.id,
    email: req.body.email,
    password: hash,
    role: req.body.role
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

let signIn = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then(response => {
    console.log('response signin: ', response)
    if (response !== null) {
      if (bcrypt.compareSync(req.body.password, response.password)) {
        var token = jwt.sign({
          id: response.id, 
          username: response.username, 
          email: response.email
        }, process.env.SECRET_KEY)
      console.log('token: ', token)
      res.send({
        token: token,
        id: response.id,
        username: response.username,
        email: response.email
      })
      } else {
        res.send('password salah')
      }
    } else {
      res.send('username yang anda masukkan salah')
    }
  })
  .catch(err => {
    console.log('error ketika signin: ', err)
    res.send(err)
  })
}

let deleteUser = (req, res) => {
  User.remove({
    _id: req.params.id
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}


module.exports = {
    getAllUsers,
    getUserById,
    signIn,
    createUser,
    editUser,
    deleteUser
}