const postUsersMiddleware = (req, res, next) => {
    const user_id = req.post.user_id

    if(user_id === user_id ){
        next()
    } else {
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    }
}

exports.postUsersMiddleware = postUsersMiddleware