// import dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create schema
const UserSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
})

// export schema
module.exports = User = mongoose.model('users', UserSchema)
