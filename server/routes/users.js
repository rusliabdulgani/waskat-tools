const express = require('express')
const router = express.Router()

//IMPORT CONTROLLER USER
const controller = require('../controllers/userController')
const auth = require('../helper/auth')

router.get('/', auth.adminOnly, controller.getAllUsers)
router.get('/:id', auth.adminOnly, controller.getUserById)
router.post('/signin', controller.signIn)
router.post('/create-user', auth.adminOnly, controller.createUser)
router.put('/:id', auth.adminOnly, controller.editUser)
router.delete('/:id', auth.adminOnly, controller.deleteUser)


module.exports = router
