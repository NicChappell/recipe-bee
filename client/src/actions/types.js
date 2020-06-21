// auth actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

// error actions
export const SET_ERRORS = 'SET_ERRORS'

// recipe actions
export const COUNT_RECIPES = 'COUNT_RECIPES'
export const GET_RECIPE = 'GET_RECIPE'
export const GET_RECIPES = 'GET_RECIPES'
export const PUT_RECIPE = 'PUT_RECIPE'
export const SET_USER_RECIPES = 'SET_USER_RECIPES'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'

// tag actions
export const GET_TAGS = 'GET_TAGS'

// upload actions
export const DELETE_FILE = 'DELETE_FILE'

// user actions
export const DELETE_CURRENT_USER = 'DELETE_CURRENT_USER' // DO I NEED THIS ACTION TYPE? IF A USER IS DELETED, DO I NEED TO UPDATE STATE?
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER' // DO I NEED THIS ACTION TYPE? IF A USER IS UPDATED, I SHOULD JUST RE-SET THE USER AGAIN... I THINK?

// utility actions
export const SET_ROUTER_HEIGHT = 'SET_ROUTER_HEIGHT'
