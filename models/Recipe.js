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
    preparation: Array,
    instructions: Array,
    prepTime: {
        hours: {
            type: Number,
            default: 0
        },
        minutes: {
            type: Number,
            default: 0
        }
    },
    cookTime: {
        hours: {
            type: Number,
            default: 0
        },
        minutes: {
            type: Number,
            default: 0
        }
    },
    totalTime: {
        hours: {
            type: Number,
            default: 0
        },
        minutes: {
            type: Number,
            default: 0
        }
    },
    shared: {
        type: Boolean,
        default: false
    },
    upVotes: Array,
    downVotes: Array,
    netVotes: {
        type: Number,
        default: 0
    },
    percentDownVotes: {
        type: Number,
        default: 0.0
    },
    percentUpVotes: {
        type: Number,
        default: 0.0
    },
    hearts: Array,
    totalHearts: {
        type: Number,
        default: 0
    },
    tags: Array
})

// export schema
module.exports = Recipe = mongoose.model('recipes', RecipeSchema)
