// import dependencies
const express = require('express')
const moment = require('moment')

// import validation
const validateRecipe = require('../../../validation/recipe')
const validateAuthStatus = require('../../../validation/auth')

// import models
const Recipe = require('../../../models/Recipe')

// instantiate a new Router class
const router = express.Router()

// @route:  GET api/v1/recipes/?limit=limit&skip=skip&sortMethod=sortMethod
// @desc:   Return all recipes
router.get('/', (req, res) => {
    // destructure query parameters
    const {
        limit,
        skip,
        sortMethod
    } = req.query

    let find = {}
    let sort = {}
    switch (sortMethod) {
        case 'mostLovedRecipes':
            sort = { totalHearts: -1, createdAt: 1 }
            break
        case 'newRecipes':
            sort = { createdAt: -1 }
            break
        case 'topRecipes':
            sort = { netVotes: -1, createdAt: 1 }
            break
        case 'trendingRecipes':
            // get the current date and time
            const now = moment()
            // filter for previous n days and more than 99 net (up)votes
            find = { createdAt: { $gt: now.subtract(1, 'days') }, netVotes: { $gt: 99 } }
            sort = { percentUpVotes: -1 }
            break
        default:
            find = {}
            sort = {}
            break
    }

    Recipe.find(find)
        .limit(limit ? parseInt(limit) : 0)
        .skip(skip ? parseInt(skip) : 0)
        .sort(sort)
        .then(recipes => res.status(200).json(recipes))
        .catch(err => res.status(400).json(err))
})

// @route:  POST api/v1/recipes/
// @desc:   Create new recipe
router.post('/', (req, res) => {
    console.log(req.body)
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

    // destructure request body
    const {
        user,
        title,
        slug,
        description,
        photo,
        prepTimeHours,
        prepTimeMinutes,
        cookTimeHours,
        cookTimeMinutes,
        preparations,
        ingredients,
        instructions,
        notes,
        tagList,
        share
    } = req.body

    let totalTimeHours = 0
    let totalTimeMinutes = 0

    if (prepTimeMinutes + cookTimeMinutes >= 60) {
        totalTimeHours = prepTimeHours + cookTimeHours + 1
        totalTimeMinutes = prepTimeMinutes + cookTimeMinutes - 60
    } else {
        totalTimeHours = prepTimeHours + cookTimeHours
        totalTimeMinutes = prepTimeMinutes + cookTimeMinutes
    }

    // instantiate new Recipe object
    const newRecipe = new Recipe({
        user,
        title,
        slug,
        description,
        photo,
        prepTime: {
            hours: prepTimeHours,
            minutes: prepTimeMinutes
        },
        cookTime: {
            hours: cookTimeHours,
            minutes: cookTimeMinutes
        },
        totalTime: {
            hours: totalTimeHours,
            minutes: totalTimeMinutes
        },
        preparations,
        ingredients,
        instructions,
        notes,
        tagList,
        share,
        upVotes: [user],
        netVotes: 1
    })

    // save recipe to database
    newRecipe.save()
        .then(recipe => res.status(200).json({ mesage: "successfully created recipe", recipe }))
        .catch(err => res.status(500).json({ mesage: "faled to create recipe", err }))
})

// @route:  GET api/v1/recipes/:recipeId
// @desc:   Return recipe
router.get('/:recipeId', (req, res) => {
    // destructure request params
    const { recipeId } = req.params

    // find recipe
    Recipe.findById(recipeId)
        .populate('user')
        .populate('photo')
        .then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(404).json({ recipe: 'Recipe not found', err }))
})

// @route:  PUT api/v1/recipes/:recipeId
// @desc:   Update recipe
router.put('/:recipeId', (req, res) => {
    // destructure validateAuthStatus()
    const {
        errors,
        isValid
    } = validateAuthStatus(req.get('Authorization'))

    // check validation
    if (!isValid) {
        return res
            .status(401)
            .json(errors)
    }

    // destructure request body
    const { body } = req

    // destructure request params
    const { recipeId } = req.params

    // find recipe and update
    Recipe.findByIdAndUpdate(recipeId, { ...body }, { new: true })
        .then(recipe => res.status(200).json({ message: 'successfully updated recipe', recipe }))
        .catch(err => res.status(400).json({ message: 'falied to update recipe', err }))
})

// @route:  DELETE api/v1/recipes/:recipeId
// @desc:   Delete recipe
router.delete('/:recipeId', (req, res) => {
    // destructure request params
    const { recipeId } = req.params

    // find recipe and delete
    Recipe.findByIdAndDelete(recipeId)
        .then(() => res.status(200).json({ message: 'successfully deleted recipe' }))
        .catch(err => res.status(400).json({ message: 'falied to delete recipe', err }))
})

// export router
module.exports = router
