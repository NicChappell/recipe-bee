// import actions
import {
    COUNT_RECIPES,
    GET_RECIPE,
    GET_RECIPES,
    SET_USER_RECIPES,
    UPDATE_RECIPE
} from '../actions/types'

// define initial state
const initialState = {
    recipe: {},
    recipesCount: 0,
    searchableRecipes: {
        mostLovedRecipes: [],
        newRecipes: [],
        topRecipes: [],
        trendingRecipes: []
    },
    userRecipes: {
        submissions: [],
        favorites: [],
        upVoted: [],
        downVoted: []
    }
}

const recipeReducer = (state = initialState, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    // determine how to change state
    switch (type) {
        case COUNT_RECIPES: {
            // destructure payload
            const { count } = payload

            // update state
            return {
                ...state,
                recipesCount: count
            }
        }
        case GET_RECIPE: {
            // destructure payload
            const { recipe } = payload

            // update state
            return {
                ...state,
                recipe
            }
        }
        case GET_RECIPES: {
            // destructure payload
            const {
                key,
                reset,
                value
            } = payload

            // destructure state
            const { searchableRecipes } = state

            // array to collect new values
            let newValue = []

            // add new values to array
            reset
                ? newValue = value
                : newValue = [...searchableRecipes[key], ...value]

            // update searchable recipes
            const newSearchableRecipes = {
                ...searchableRecipes,
                [key]: newValue
            }

            // update state
            return {
                ...state,
                searchableRecipes: newSearchableRecipes
            }
        }
        case SET_USER_RECIPES: {
            // destructure payload
            const { userRecipes } = payload

            // update state
            return {
                ...state,
                userRecipes
            }
        }
        case UPDATE_RECIPE: {
            // destructure payload
            const { recipe: newRecipe } = payload
            // console.log(payload)

            // destructure state
            const {
                searchableRecipes,
                userRecipes
            } = state
            // console.log(state)

            // destructure searchable recipes
            const {
                mostLovedRecipes,
                newRecipes,
                topRecipes,
                trendingRecipes
            } = searchableRecipes

            // destructure user recipes
            const {
                submissions,
                favorites,
                upVoted,
                downVoted
            } = userRecipes

            // findIndex callback function
            const findRecipeIndex = oldRecipe => oldRecipe._id === newRecipe._id

            // objects to collect found index values
            const foundSearchableIndexes = {
                mostLovedRecipes: mostLovedRecipes.findIndex(findRecipeIndex),
                newRecipes: newRecipes.findIndex(findRecipeIndex),
                topRecipes: topRecipes.findIndex(findRecipeIndex),
                trendingRecipes: trendingRecipes.findIndex(findRecipeIndex)
            }
            const foundUserIndexes = {
                submissions: submissions.findIndex(findRecipeIndex),
                favorites: favorites.findIndex(findRecipeIndex),
                upVoted: upVoted.findIndex(findRecipeIndex),
                downVoted: downVoted.findIndex(findRecipeIndex)
            }

            // objects to collect new values
            const newSearchableRecipes = searchableRecipes
            const newUserRecipes = userRecipes

            // iterate over found index objects
            for (let [key, value] of Object.entries(foundSearchableIndexes)) {
                // isolate matching recipe array from searchable recipes
                const recipeArray = searchableRecipes[key]

                // isolate matching recipe object from recipe array
                const oldRecipe = recipeArray[value]

                if (oldRecipe) {
                    // replace recipe object in recipe array
                    recipeArray[value] = newRecipe

                    // replace recipe array in state object
                    newSearchableRecipes[key] = recipeArray
                }
            }
            for (let [key, value] of Object.entries(foundUserIndexes)) {
                // isolate matching recipe array from user recipes
                const recipeArray = userRecipes[key]

                // isolate matching recipe object from recipe array
                const oldRecipe = recipeArray[value]

                if (oldRecipe) {
                    // replace recipe object in recipe array
                    recipeArray[value] = newRecipe

                    // replace recipe array in state object
                    newUserRecipes[key] = recipeArray
                }
            }

            // object to collect updated state values
            const updatedState = {
                recipe: newRecipe,
                searchableRecipes: newSearchableRecipes,
                userRecipes: newUserRecipes
            }

            // update state
            return {
                ...state,
                ...updatedState
            }
        }
        default:
            return state
    }
}

export default recipeReducer
