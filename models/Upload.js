// import dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create schema
const UploadsSchema = new Schema({}, { strict: false, collection: 'uploads.files' })

// export schema
module.exports = Upload = mongoose.model('uploads', UploadsSchema)
