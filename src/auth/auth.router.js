const router = require('express').Router()
const httpAuth = require('./auth.http')
const {register} = require('../users/users.http')

router.post('/login', httpAuth.login)
router.post('/register', register)

exports.router = router