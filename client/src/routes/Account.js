// import dependencies
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import {
    changeHeart,
    changeVote,
    setUserRecipes
} from '../actions/recipeActions'
import {
    deleteUser,
    updateUser
} from '../actions/userActions'

// import components
import Profile from '../components/account/Profile'
import Recipes from '../components/account/Recipes'
import Settings from '../components/account/Settings'

const Account = props => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        deleteUser,
        errors,
        history,
        recipes,
        setUserRecipes,
        updateUser
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // state hook variables
    const [component, setComponent] = useState('profile')

    const handleClick = e => {
        // destructure event
        const { name } = e.currentTarget

        // update state
        setComponent(name)
    }

    // set user recipes when viewing recipes component
    useEffect(() => {
        if (component === 'recipes') {
            setUserRecipes(user._id)
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [component])

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container" id="account">
                <div className="row">
                    <div className="col s12 l3">
                        <ul className="navigation">
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
                            ? <Profile
                                errors={errors}
                                updateUser={updateUser}
                                user={user}
                            />
                            : null
                        }
                        {component === 'recipes'
                            ? <Recipes
                                auth={auth}
                                changeHeart={changeHeart}
                                changeVote={changeVote}
                                recipes={recipes}
                            />
                            : null
                        }
                        {component === 'settings'
                            ? <Settings
                                deleteUser={deleteUser}
                                errors={errors}
                                history={history}
                                user={user}
                            />
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
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    deleteUser: PropTypes.func,
    errors: PropTypes.object,
    history: PropTypes.object,
    recipes: PropTypes.object,
    setUserRecipes: PropTypes.func,
    updateUser: PropTypes.func,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes
})

const actionCreators = {
    changeHeart,
    changeVote,
    deleteUser,
    setUserRecipes,
    updateUser
}

export default connect(mapStateToProps, actionCreators)(Account)
