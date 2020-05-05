// import dependencies
import axios from 'axios'

// import actions
import {
    GET_ERRORS,
    GET_RECIPE,
    GET_RECIPES
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
    axios.get(`/api/v1/recipes/${recipeId}`)
        .then(res => dispatch({ type: GET_RECIPE, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// get recipes
export const getRecipes = (limit, skip, sortMethod) => dispatch => {
    axios.get(`/api/v1/recipes/?limit=${limit}&skip=${skip}&sortMethod=${sortMethod}`)
        .then(res => dispatch({ type: GET_RECIPES, payload: { key: sortMethod, value: res.data } }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// update recipe
export const updateRecipe = (recipeId, recipeData) => dispatch => {
    axios.put(`/api/v1/recipes/${recipeId}`, recipeData)
        .then(res => dispatch({ type: GET_RECIPE, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
