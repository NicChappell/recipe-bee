// import dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// import uploads schema
const { Upload } = require('./Upload')
const { User } = require('./User')

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
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'uploads'
    },
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
    preparations: {
        type: Array,
        default: []
    },
    ingredients: {
        type: Array,
        default: []
    },
    instructions: {
        type: Array,
        default: []
    },
    notes: {
        type: String,
        required: false
    },
    tagList: {
        type: Array,
        default: []
    },
    share: {
        type: Boolean,
        default: false
    },
    upVotes: {
        type: Array,
        default: []
    },
    downVotes: {
        type: Array,
        default: []
    },
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
    hearts: {
        type: Array,
        default: []
    },
    totalHearts: {
        type: Number,
        default: 0
    }
})

// export schema
module.exports = Recipe = mongoose.model('recipes', RecipeSchema)
