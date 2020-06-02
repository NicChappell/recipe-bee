// import dependencies
import axios from 'axios'

// import action types
import {
    SET_CURRENT_USER,
    SET_ERRORS,
} from './types'

// update recipe
export const deleteUser = (user, history) => dispatch => {
    console.log(user)
    console.log(history)
    // // extract and remove id property from recipe data
    // const userId = userData._id
    // delete userData._id

    // if (photoStatus === 'new') {
    //     // instantiate a new FormData object
    //     const formData = new FormData()

    //     // append image file to form data
    //     // 'file' corresponds to matching POST method paramter
    //     formData.append('file', recipeData.photo)

    //     axios.post('/api/v1/uploads/', formData)
    //         .then(res => {
    //             // update recipe data
    //             recipeData = {
    //                 ...recipeData,
    //                 photo: res.data.file.id
    //             }

    //             // update recipe
    //             return axios.put(`/api/v1/recipes/${recipeId}`, recipeData)
    //         })
    //         .then(res => history.push(`/recipes/${res.data.recipe.slug}/${res.data.recipe._id}`))
    //         .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
    // } else {
    //     // remove photo property from recipe
    //     delete recipeData.photo

    //     // update recipe
    //     axios.put(`/api/v1/recipes/${recipeId}`, recipeData)
    //         .then(res => history.push(`/recipes/${res.data.recipe.slug}/${res.data.recipe._id}`))
    //         .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
    // }
}

// update user
export const updateUser = (userId, userData) => dispatch => {
    axios.put(`/api/v1/users/${userId}`, userData)
        .then(res => dispatch({ type: SET_CURRENT_USER, payload: res.data.user }))
        .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
}
