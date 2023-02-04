const express = require('express')
const app = express()
const path = require('path')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/js/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/image', express.static(path.join(__dirname, 'public/assets/images')))
app.use('/document', express.static(path.join(__dirname, 'public/assets/docs')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app