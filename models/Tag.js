// import dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create schema
const TagSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

// export schema
module.exports = Tag = mongoose.model('tags', TagSchema)
