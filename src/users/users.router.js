const router = require('express').Router()
const httpUsers = require('./users.http')
const passport = require('passport')
const { adminRolMiddleware } = require('../middleware/adminRol.middleware')
require('../middleware/auth.middleware')(passport)

router.route('/')
    .get(httpUsers.getAll)
    .post(httpUsers.register)

router.route('/me')
    .get(passport.authenticate('jwt', {session: false}), httpUsers.getMyUser)
    .put(passport.authenticate('jwt', {session: false}), httpUsers.editMyUser)
    .delete(passport.authenticate('jwt', {session: false}), httpUsers.removeMyUser)
    
router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), httpUsers.getUserById)
    .delete(adminRolMiddleware('jwt', {session: false}), adminRolMiddleware, httpUsers.remove)
    .put(adminRolMiddleware('jwt', {session: false}), adminRolMiddleware, httpUsers.edit)
    

module.exports = {
    router
}