// import dependencies
const express = require('express')
const moment = require('moment')

// import validation
const validateTag = require('../../../validation/tag')

// import models
const Tag = require('../../../models/Tag')

// instantiate a new Router class
const router = express.Router()

// @route:  GET api/v1/tags/
// @desc:   Return all tags
// @access: Public
router.get('/', (req, res) => {
    Tag.find({})
        .then(tags => res.status(200).json(tags))
        .catch(err => res.status(400).json(err))
})

// @route:  POST api/v1/tags/
// @desc:   Create new tag
// @access: Public
router.post('/', (req, res) => {
    // destructure validateTag()
    const {
        errors,
        isValid
    } = validateTag(req.body)

    // check validation
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // destructure request body
    const {
        createdAt,
        updatedAt,
        tag,
        category
    } = req.body

    // instantiate new Tag object
    const newTag = new Tag({
        createdAt,
        updatedAt,
        tag: tag.toLowerCase(),
        category: category.toLowerCase()
    })

    // save tag to database
    newTag.save()
        .then(tag => res.status(200).json({ mesage: "successfully created tag", tag }))
        .catch(err => res.status(500).json({ mesage: "faled to create tag", err }))
})

// export router
module.exports = router
