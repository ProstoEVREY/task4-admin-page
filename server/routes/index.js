const express = require('express')
const router = express.Router()
const service = require('../controllers/userContoller.js')
const authMiddleWare = require('../middleware/authMiddleware')
const blockedMiddleware = require('../middleware/blockedMiddleware')

router.post('/login', service.login)
router.post('/register',service.registration)
router.get('/auth',authMiddleWare,service.check)
router.get('/users',blockedMiddleware("ACTIVE"), service.getUsers)
router.put('/users',blockedMiddleware("ACTIVE"),service.block)
router.delete('/users',service.deleteUser)


module.exports = router

