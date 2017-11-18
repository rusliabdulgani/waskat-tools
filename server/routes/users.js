const express = require('express')
const router = express.Router()

//IMPORT CONTROLLER USER
const controller = require('../controllers/userController')
const auth = require('../helper/auth')

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUserById)
router.post('/signin', controller.signIn)
router.post('/create-user', controller.createUser)
router.put('/:id', controller.editUser)
router.delete('/:id', controller.deleteUser)


module.exports = router
