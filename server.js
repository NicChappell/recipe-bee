// import dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require("passport")

// import config keys
const { mongoURI } = require('./config/keys')

// import routers
const recipes = require("./routes/api/v1/recipes")
const tags = require("./routes/api/v1/tags")
const uploads = require("./routes/api/v1/uploads")
const users = require("./routes/api/v1/users")

// passport config
require("./config/passport")(passport)

// create an Express application
const app = express()

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// passport middleware
app.use(passport.initialize())

// database config
const db = mongoURI

// connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(err, 'error connecting to MongoDB'))

// routes
app.use("/api/v1/recipes", recipes)
app.use("/api/v1/tags", tags)
app.use("/api/v1/users", users)
app.use("/api/v1/uploads", uploads)

// use process.env.port if deployed to Heroku or localhost:5000 in dev
const PORT = process.env.port || 5000

// activate the server
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
