// * Dependencias:
const express = require('express')
const passport = require('passport')
const { verbMiddleware } = require('./middleware/verb.')
require('./middleware/auth.middleware')(passport)

//* Archivos de rutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router
const postRouter = require('./posts/posts.router')

// * Configuraciones iniciales:
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'All ok!'})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth/', authRouter)
app.use('/api/v1/posts', postRouter)


// app.get('/ejemplo',
//     passport.authenticate('jwt', {session: false}),
//     (req, res) => {
//         res.status(200).json({message: 'Ruta protegida', email: req.user.email})
// })

app.use('/', (req, res) => {
    res.json({message: 'Petition whith use', method: req.method})
})

app.listen (8000, () => {
    console.log('Server started at port 8000')
})
