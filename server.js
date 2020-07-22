// import dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

// configure dotenv
require('dotenv').config()

// import routers
const contact = require('./routes/api/v1/contact')
const recipes = require('./routes/api/v1/recipes')
const tags = require('./routes/api/v1/tags')
const uploads = require('./routes/api/v1/uploads')
const users = require('./routes/api/v1/users')

// passport config
require('./config/passport')(passport)

// create an Express application
const app = express()

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport middleware
app.use(passport.initialize())

// routes
app.use('/api/v1/contact', contact)
app.use('/api/v1/recipes', recipes)
app.use('/api/v1/tags', tags)
app.use('/api/v1/users', users)
app.use('/api/v1/uploads', uploads)

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// database config
const db = process.env.DB_URI

// connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(err, 'error connecting to MongoDB'))

// use process.env.PORT if deployed to Heroku or localhost:5000 in dev
const PORT = process.env.PORT || 5000

// activate the server
app.listen(PORT, () => console.log(`server running on port http://localhost:${PORT}`))
