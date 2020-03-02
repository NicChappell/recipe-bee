// import dependencies
const express = require('express')

// import user input validation
const validateRecipe = require('../../../validation/recipe')

// import models
const Recipe = require('../../../models/Recipe')

// instantiate a new Router class
const router = express.Router()

// @route:  GET api/v1/recipes/
// @desc:   Return all recipes
// @access: Public
router.get('/', (req, res) => {
    // destructure query parameters
    const { limit } = req.query
    if (limit) {
        Recipe.find({})
            .limit(limit)
            .then(recipes => res.status(200).json(recipes))
            .catch(err => res.status(400).json(err))
    } else {
        Recipe.find({})
            .then(recipes => res.status(200).json(recipes))
            .catch(err => res.status(400).json(err))
    }
})

// @route:  POST api/v1/recipes/
// @desc:   Create new recipe
// @access: Public
router.post('/', (req, res) => {
    // destructure validateRecipe()
    const {
        errors,
        isValid
    } = validateRecipe(req.body)

    // check validation
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // // destructure request body
    // const {
    //     user,
    //     title,
    //     description,
    //     photo,
    //     ingredients,
    //     instructions,
    //     tags,
    //     shared,
    //     upVotes,
    //     downVotes
    // } = req.body

    // instantiate new Recipe object
    const newRecipe = new Recipe({ ...req.body })

    // save recipe to database
    newRecipe.save()
        .then(recipe => res.status(200).json({ mesage: "successfully created recipe", recipe }))
        .catch(err => res.status(500).json({ mesage: "faled to creat recipe", err }))
})

// @route:  DELETE api/v1/recipes/:recipeId
// @desc:   Delete recipe
// @access: Public
router.delete('/:recipeId', (req, res) => {
    // destructure request params
    const { recipeId } = req.params

    // find recipe and delete
    Recipe.findByIdAndDelete(recipeId)
        .then(() => res.status(200).json({ message: 'successfully deleted recipe' }))
        .catch(err => res.status(400).json({ message: 'falied to delete recipe', err }))
})

// @route:  GET api/v1/recipes/:recipeId
// @desc:   Return recipe
// @access: Public
router.get('/:recipeId', (req, res) => {
    // destructure request params
    const { recipeId } = req.params

    // find recipe
    Recipe.findById(recipeId)
        .populate('user')
        .then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(400).json(err))
})

// @route:  PUT api/v1/recipes/:recipeId
// @desc:   Update recipe
// @access: Public
router.put('/:recipeId', (req, res) => {
    // destructure request params
    const { recipeId } = req.params

    // find recipe and update
    Recipe.findByIdAndUpdate(recipeId, { ...req.body }, { new: true })
        .then(recipe => res.status(200).json({ message: 'successfully updated recipe', recipe }))
        .catch(err => res.status(400).json({ message: 'falied to update recipe', err }))
})

// export router
module.exports = router
