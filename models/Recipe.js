// import dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create schema
const RecipeSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: undefined
    },
    ingredients: Array,
    instructions: Array,
    shared: {
        type: Boolean,
        default: false
    },
    upVotes: Array,
    downVotes: Array,
    tags: Array
})

// export schema
module.exports = Recipe = mongoose.model('recipes', RecipeSchema)
