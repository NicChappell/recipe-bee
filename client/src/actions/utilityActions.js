// import actions
import { SET_ROUTER_HEIGHT } from './types'

// calculate router height
export const setRouterHeight = height => dispatch => {
    dispatch({ type: SET_ROUTER_HEIGHT, payload: height})
}
