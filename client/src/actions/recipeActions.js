// import dependencies
import axios from 'axios'

// import action types
import {
    GET_ERRORS,
    COUNT_RECIPES,
    GET_RECIPE,
    GET_RECIPES,
    SET_USER_RECIPES,
    UPDATE_RECIPE
} from './types'

// create recipe
export const createRecipe = (recipe, history) => dispatch => {
    // instantiate a new FormData object
    const formData = new FormData()

    // append file to form data
    // 'file' corresponds to matching POST method paramter
    formData.append('file', recipe.photo)

    axios.post('/api/v1/uploads/', formData)
        .then(res => {
            // use response to update recipe object
            recipe = {
                ...recipe,
                photo: res.data.file.id
            }

            return axios.post('/api/v1/recipes/', recipe)
        })
        .then(res => {
            history.push(`/recipes/${res.data.recipe.slug}/${res.data.recipe._id}`)
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// get recipe
export const getRecipe = recipeId => dispatch => {
    if (recipeId === 'reset') {
        dispatch({ type: GET_RECIPE, payload: { message: 'reset recipe', recipe: {} } })
    } else {
        axios.get(`/api/v1/recipes/${recipeId}`)
            .then(res => dispatch({ type: GET_RECIPE, payload: res.data }))
            .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
    }
}

// get recipes
export const getRecipes = (reset, limit, skip, sortMethod, days) => dispatch => {
    axios.get(`/api/v1/recipes/?limit=${limit}&skip=${skip}&sortMethod=${sortMethod}&days=${days}`)
        .then(res => dispatch({ type: GET_RECIPES, payload: { key: sortMethod, reset, value: res.data } }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// set user recipes
export const setUserRecipes = userId => dispatch => {
    // object to collect user recipes
    const userRecipes = {}

    // get user's submitted recipes
    axios.get(`/api/v1/recipes/${userId}/submissions/`)
        .then(res => {
            // add submitted recipes to recipe object
            userRecipes.submissions = res.data.recipes

            // get user's favorite recipes
            return axios.get(`/api/v1/recipes/${userId}/favorites/`)
        })
        .then(res => {
            // add favorite recipes to recipe object
            userRecipes.favorites = res.data.recipes

            // get user's up-voted recipes
            return axios.get(`/api/v1/recipes/${userId}/up-votes/`)
        })
        .then(res => {
            // add up-voted recipes to recipe object
            userRecipes.upVoted = res.data.recipes

            // get user's down-voted recipes
            return axios.get(`/api/v1/recipes/${userId}/down-votes/`)
        })
        .then(res => {
            // add down-voted recipes to recipe object
            userRecipes.downVoted = res.data.recipes

            dispatch({ type: SET_USER_RECIPES, payload: { userRecipes } })
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

// update recipe
export const updateRecipe = (recipeId, recipeData) => dispatch => {
    axios.put(`/api/v1/recipes/${recipeId}`, recipeData)
        .then(res => dispatch({ type: UPDATE_RECIPE, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// count recipes
export const countRecipes = () => dispatch => {
    axios.get('/api/v1/recipes/utilities/count')
        .then(res => dispatch({ type: COUNT_RECIPES, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
