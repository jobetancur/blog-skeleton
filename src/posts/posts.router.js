const router = require('express').Router()
const httpPosts = require('./posts.http')
const passport = require('passport')
const { postUsersMiddleware } = require('../middleware/postUsers.middleware')
require('../middleware/auth.middleware')(passport)

router.route('/api/v1/posts')
    .get(httpPosts.getAll)
    .post(httpPosts.postCreation)

router.route('/api/v1/posts/:id ')
    .get(httpPosts.getByID)

router.route('/api/v1/users/me/posts')
    .get(passport.authenticate('jwt', {session: false}), httpPosts.getMyPost)

router.route('/api/v1/users/me/posts/:id')
    .get(passport.authenticate('jwt', {session: false}), httpPosts.getByID)
    .put(passport.authenticate('jwt', {session: false}), postUsersMiddleware, httpPosts.edit)
    .delete(passport.authenticate('jwt', {session: false}), postUsersMiddleware, httpPosts.removePost)
    