// import dependencies
const express = require('express')
const moment = require('moment')
const isEmpty = require('lodash.isempty')

// import validation
const validateRecipe = require('../../../validation/recipe')
const validateAuthStatus = require('../../../validation/auth')

// import models
const Recipe = require('../../../models/Recipe')

// instantiate a new Router class
const router = express.Router()

// @route:  GET /api/v1/recipes/?limit=limit&skip=skip&sortMethod=sortMethod&days=days
// @desc:   Return all recipes
router.get('/', (req, res) => {
    // destructure query params
    const {
        limit,
        skip,
        sortMethod,
        days
    } = req.query

    // get the current date and time
    const now = moment()

    let filter = {}
    let sort = {}
    switch (sortMethod) {
        case 'mostLovedRecipes':
            // filter for previous x days
            filter = { createdAt: { $gt: now.subtract(parseInt(days), 'days') } }
            sort = { totalHearts: -1, createdAt: 1 }
            break
        case 'newRecipes':
            // filter for previous 30 days
            filter = { createdAt: { $gt: now.subtract(30, 'days') } }
            sort = { createdAt: -1 }
            break
        case 'topRecipes':
            // filter for previous x days
            filter = { createdAt: { $gt: now.subtract(parseInt(days), 'days') } }
            sort = { netVotes: -1, createdAt: 1 }
            break
        case 'trendingRecipes':
            // filter for previous x days and more than y net (up)votes
            filter = { createdAt: { $gt: now.subtract(parseInt(days), 'days') }, netVotes: { $gt: 0 } }
            sort = { percentUpVotes: -1 }
            break
        default:
            filter = {}
            sort = {}
    }

    Recipe.find(filter)
        .populate(['user', 'photo'])
        .limit(limit ? parseInt(limit) : 0)
        .skip(skip ? parseInt(skip) : 0)
        .sort(sort)
        .then(recipes => res.status(200).json({ message: 'fetched recipe documnents', recipes }))
        .catch(err => res.status(400).json({ message: 'error fetching recipe documents', err }))
})

// @route:  POST /api/v1/recipes/
// @desc:   Create new recipe
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
        servings,
        production,
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
        servings,
        production,
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
        .then(recipe => res.status(200).json({ mesage: 'created recipe', recipe }))
        .catch(err => res.status(500).json({ mesage: 'failed to create recipe', err }))
})

// @route:  GET /api/v1/recipes/:recipeId
// @desc:   Return recipe
router.get('/:recipeId', (req, res) => {
    // destructure request params
    const { recipeId } = req.params

    // find recipe
    Recipe.findById(recipeId)
        .populate(['user', 'photo'])
        .then(recipe => res.status(200).json({ mesage: 'found recipe', recipe }))
        .catch(err => res.status(404).json({ recipe: 'failed to find recipe', err }))
})

// @route:  PUT /api/v1/recipes/:recipeId
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
        .populate(['user', 'photo'])
        .then(recipe => res.status(200).json({ message: 'updated recipe', recipe }))
        .catch(err => res.status(400).json({ message: 'error updating recipe', err }))
})

// @route:  DELETE /api/v1/recipes/:recipeId
// @desc:   Delete recipe
router.delete('/:recipeId', (req, res) => {
    // destructure request params
    const { recipeId } = req.params

    // find recipe and delete
    Recipe.findByIdAndDelete(recipeId)
        .then(() => res.status(200).json({ message: 'deleted recipe' }))
        .catch(err => res.status(400).json({ message: 'error deleting recipe', err }))
})

// @route:  GET /api/v1/recipes/utilities/count?&sortMethod=sortMethod&days=days
// @desc:   Return all recipes
router.get('/utilities/count', (req, res) => {
    // destructure query params
    const sortMethod = req.query.sortMethod || ''
    const days = req.query.days || 0

    // get the current date and time
    const now = moment()

    let filter = {}
    switch (sortMethod) {
        case 'mostLovedRecipes':
            // filter for previous x days
            days
                ? filter = { createdAt: { $gt: now.subtract(parseInt(days), 'days') } }
                : filter = {}
            break
        case 'newRecipes':
            // filter for previous x days
            days
                ? filter = { createdAt: { $gt: now.subtract(parseInt(days), 'days') } }
                : filter = {}
            break
        case 'topRecipes':
            // filter for previous x days
            days
                ? filter = { createdAt: { $gt: now.subtract(parseInt(days), 'days') } }
                : filter = {}
            break
        case 'trendingRecipes':
            // filter for previous x days and more than y net (up)votes
            days
                ? filter = { createdAt: { $gt: now.subtract(parseInt(days), 'days') }, netVotes: { $gt: 0 } }
                : filter = { netVotes: { $gt: 0 } }
            break
        default:
            filter = {}
    }

    Recipe.countDocuments(filter)
        .then(count => res.status(200).json({ message: 'counted recipe documnents', count }))
        .catch(err => res.status(400).json({ message: 'error counting recipe documents', err }))
})

// @route:  GET /api/v1/recipes/:userId/down-votes/
// @desc:   Return a user's down-voted recipes
router.get('/:userId/down-votes', (req, res) => {
    // destructure request params
    const { userId } = req.params

    Recipe.find({ downVotes: userId })
        .populate(['user', 'photo'])
        .then(recipes => {
            isEmpty(recipes)
                ? res.status(200).json({ mesage: 'no down-voted recipes found', recipes })
                : res.status(200).json({ mesage: `found ${recipes.length} down-voted recipes`, recipes })
        })
        .catch(err => res.status(500).json({ recipe: 'error finding recipes', err }))
})

// @route:  GET /api/v1/recipes/:userId/favorites/
// @desc:   Return a user's favorite recipes
router.get('/:userId/favorites', (req, res) => {
    // destructure request params
    const { userId } = req.params

    Recipe.find({ hearts: userId })
        .populate(['user', 'photo'])
        .then(recipes => {
            isEmpty(recipes)
                ? res.status(200).json({ mesage: 'no favorite recipes found', recipes })
                : res.status(200).json({ mesage: `found ${recipes.length} favorite recipes`, recipes })
        })
        .catch(err => res.status(500).json({ recipe: 'error finding recipes', err }))
})

// @route:  GET /api/v1/recipes/:userId/submissions/
// @desc:   Return a user's submitted recipes
router.get('/:userId/submissions', (req, res) => {
    // destructure request params
    const { userId } = req.params

    Recipe.find({ user: userId })
        .populate(['user', 'photo'])
        .then(recipes => {
            isEmpty(recipes)
                ? res.status(200).json({ mesage: 'no recipe submissions found', recipes })
                : res.status(200).json({ mesage: `found ${recipes.length} recipe submissions`, recipes })
        })
        .catch(err => res.status(500).json({ recipe: 'error finding recipes', err }))
})

// @route:  GET /api/v1/recipes/:userId/up-votes/
// @desc:   Return a user's up-voted recipes
router.get('/:userId/up-votes', (req, res) => {
    // destructure request params
    const { userId } = req.params

    Recipe.find({ upVotes: userId })
        .populate(['user', 'photo'])
        .then(recipes => {
            isEmpty(recipes)
                ? res.status(200).json({ mesage: 'no up-voted recipes found', recipes })
                : res.status(200).json({ mesage: `found ${recipes.length} up-voted recipes`, recipes })
        })
        .catch(err => res.status(500).json({ recipe: 'error finding recipes', err }))
})

// export router
module.exports = router
