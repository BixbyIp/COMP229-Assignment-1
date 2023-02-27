//define routing using methods of the Express app object that correspond to HTTP methods.>

const express = require('express')
const app = express()
const path = require('path')

const session = require('express-session')
const passport = require('passport')
const passportLocal = require('passport-local')
const localStrategy = passportLocal.Strategy
const flash = require('connect-flash')


// database setup
const mongoose = require('mongoose');
const DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI,{useNewUrlParser: true,useUnifiedTopology: true});

const mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error:'));
mongoDB.once('open',()=> {console.log('Connected to MongoDB...');
});

const indexRouter = require('../routes/index')
const usersRouter = require('../routes/users')
const contactsRouter = require('../routes/contact')

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/js/dist')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/jquery/dist')))
app.use('/image', express.static(path.join(__dirname, '../../public/assets/images')))
app.use('/document', express.static(path.join(__dirname, '../../public/assets/docs')))

//defines routes and mounts the router module on a path in the main app.
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/contact-list',contactsRouter)

//setup express session
app.use(session({
   secret: "SomeSecret",
   saveUninitialized: false,
   resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// passport user configuration

// create a User Model Instance
let userModel = require('../models/user')
let User = userModel.User;

// implement a user authentication strategy
passport.use(User.createStrategy())

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//user express built-in middleware express.static to serve static files, 
//such as images, CSS, JavaScript, etc.
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

module.exports = app
