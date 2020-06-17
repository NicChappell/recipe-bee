// import dependencies
const express = require('express')

// import validation
const validateTag = require('../../../validation/tag')

// import models
const Tag = require('../../../models/Tag')

// instantiate a new Router class
const router = express.Router()

// @route:  GET /api/v1/tags/
// @desc:   Return all tags
router.get('/', (req, res) => {
	Tag.find({})
		.then(tags => res.status(200).json(tags))
		.catch(err => res.status(400).json(err))
})

// @route:  POST /api/v1/tags/
// @desc:   Create new tag
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
		tag,
		category
	} = req.body

	// instantiate new Tag object
	const newTag = new Tag({
		tag: tag.toLowerCase(),
		category: category.toLowerCase()
	})

	// save tag to database
	newTag.save()
		.then(tag => res.status(200).json({ mesage: "successfully created tag", tag }))
		.catch(err => res.status(500).json({ mesage: "failed to create tag", err }))
})

// @route:  POST /api/v1/tags/bulk/
// @desc:   Bulk write new tags
router.post('/bulk/', (req, res) => {
	// create array of documents to insert into collection
	const documents = req.body.map(document => {
		// destructure document
		const {
			tag,
			category
		} = document

		// instantiate new Tag object
		const newTag = new Tag({
			tag: tag.toLowerCase(),
			category: category.toLowerCase()
		})

		return newTag
	})

	// save documents to database
	Tag.collection.insert(documents)
		.then(result => res.status(200).json({ mesage: "successful bulk write", result }))
		.catch(err => res.status(500).json({ mesage: "failed bulk write", err }))
})

// export router
module.exports = router
