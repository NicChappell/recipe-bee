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
    address1: {
        type: String,
        default: ''
    },
    address2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
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
    postalCode: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: true
    },
    upVotes: Array,
    downVotes: Array,
    hearts: Array
})

// export schema
module.exports = User = mongoose.model('users', UserSchema)
