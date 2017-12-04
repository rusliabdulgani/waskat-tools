const express = require('express')
const router = express.Router()

//IMPORT CONTROLLER & MIDDLEWARE
const controller = require('../controllers/customerController')
const auth = require('../helper/auth')

router.get('/', auth.adminAndUser, controller.getAllCustomer)
router.get('/:id', auth.adminAndUser, controller.getCustomerById)
router.post('/', auth.adminAndUser, controller.inputCustomer)
router.put('/:id', auth.adminAndUser, controller.editCustomer)
router.delete('/:id', auth.adminAndUser, controller.deleteCustomer)

module.exports = router