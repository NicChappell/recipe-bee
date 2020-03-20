// import dependencies
import axios from 'axios'

// import actions
import {
    GET_ERRORS,
    GET_RECIPE,
    GET_RECIPES,
    UPDATE_RECIPE
} from './types'

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
        .then(res => dispatch({ type: UPDATE_RECIPE, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
