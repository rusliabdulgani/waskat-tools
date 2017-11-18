const jwt = require('jsonwebtoken')

require('dotenv').config()

let adminOnly = (req, res, next) => {
  let tokenJWT = jwt.verify(req.headers.token, process.env.SECRET_KEY)
  if (tokenJWT.role === 'admin') {
    next()
  } else {
    res.status(500).send('Restricted page, please login as admin')
  }
} 

let adminAndUser = (req, res, next) => {
  let tokenJWT = jwt.verify(req.headers.token, process.env.SECRET_KEY)
  if (tokenJWT.role === 'admin' || tokenJWT.role === 'user') {
    next ()
  } else {
    res.send('restricted page, pls login as admin or user')
  }
}

module.exports = {
    adminOnly,
    adminAndUser
}