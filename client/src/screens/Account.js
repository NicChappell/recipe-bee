// import dependencies
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import {
    setUserRecipes,
    updateRecipe
} from '../actions/recipeActions'

// import components
import Profile from '../components/account/Profile'
import Recipes from '../components/account/Recipes'
import Settings from '../components/account/Settings'

const Account = props => {
    // destructure props
    const {
        auth,
        errors,
        recipes,
        setUserRecipes,
        updateRecipe
    } = props
    // console.log(auth)
    // console.log(errors)
    // console.log(recipes)
    // console.log(setUserRecipes)
    // console.log(updateRecipe)

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth
    // console.log(isAuthenticated)
    // console.log(user)

    // state hook variables
    const [component, setComponent] = useState('profile')
    // console.log(component)

    const handleClick = e => {
        // destructure event
        const { name } = e.currentTarget

        // update state
        setComponent(name)
    }

    // set user recipes when viewing recipes component
    useEffect(() => {
        if (component === 'recipes') {
            setUserRecipes(user.id)
        }
    }, [component])

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container" id="account">
                <div className="row">
                    <div className="col s12 l3 navigation">
                        <ul>
                            <li>
                                <button
                                    className={`btn btn-flat ${component === 'profile' ? 'active' : null}`}
                                    name="profile"
                                    onClick={handleClick}
                                >
                                    <i className="material-icons left">person</i>
                                    <span>Profile</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`btn btn-flat ${component === 'recipes' ? 'active' : null}`}
                                    name="recipes"
                                    onClick={handleClick}
                                >
                                    <i className="material-icons left">book</i>
                                    <span>Recipes</span>
                                </button>
                            </li>
                            {/* <li>
                                <button
                                    className={`btn btn-flat ${component === 'meal-plans' ? 'active' : null}`}
                                    name="meal-plans"
                                    onClick={handleClick}
                                >
                                    <i className="material-icons left">content_paste</i>
                                    <span>Meal Plans</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`btn btn-flat ${component === 'shopping-lists' ? 'active' : null}`}
                                    name="shopping-lists"
                                    onClick={handleClick}
                                >
                                    <i className="material-icons left">shopping_cart</i>
                                    <span>Shopping Lists</span>
                                </button>
                            </li> */}
                            <li>
                                <button
                                    className={`btn btn-flat ${component === 'settings' ? 'active' : null}`}
                                    name="settings"
                                    onClick={handleClick}
                                >
                                    <i className="material-icons left">settings</i>
                                    <span>Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col s12 l9">
                        {component === 'profile'
                            ? <Profile user={user} />
                            : null
                        }
                        {component === 'recipes'
                            ? <Recipes
                                auth={auth}
                                recipes={recipes}
                                updateRecipe={updateRecipe}
                            />
                            : null
                        }
                        {component === 'meal-plans' ? <div className="card-panel">Meal Plans</div> : null}
                        {component === 'shopping-lists' ? <div className="card-panel">Shopping Lists</div> : null}
                        {component === 'settings'
                            ? <Settings user={user} />
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }

    // redirect if user is not authenticated
    return <Redirect to='/sign-in' />
}

Account.propTypes = {
    auth: PropTypes.object,
    errors: PropTypes.object,
    recipes: PropTypes.object,
    setUserRecipes: PropTypes.func,
    updateRecipe: PropTypes.func
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes
})

export default connect(
    mapStateToProps,
    { setUserRecipes, updateRecipe }
)(Account)
