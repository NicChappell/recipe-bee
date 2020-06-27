// import dependencies
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import {
    countRecipes,
    getRecipes
} from './actions/recipeActions'
import { getTags } from './actions/tagActions'
import { signOutUser } from './actions/authActions'

// import auth routes
import ForgotPassword from './routes/ForgotPassword'
import ResetPassword from './routes/ResetPassword'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
// import account routes
import Account from './routes/Account'
// import company routes
import About from './routes/About'
import Contact from './routes/Contact'
// import index routes
import Index from './routes/Index'
// import recipe routes
import GetRecipe from './routes/GetRecipe'
import GetRecipes from './routes/GetRecipes'
import PostRecipe from './routes/PostRecipe'
import PutRecipe from './routes/PutRecipe'
// import legalese routes
import PrivacyPolicy from './routes/PrivacyPolicy'
import TermsAndConditions from './routes/TermsAndConditions'
// import shopping routes
import Shop from './routes/Shop'
// import unmatched routes
import NoMatch from './routes/NoMatch'

// import layout components
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import SideNav from './components/layout/SideNav'

// import styles
import './styles/styles.css'

const App = props => {
    // destructure props
    const {
        auth,
        countRecipes,
        getRecipes,
        getTags,
        signOutUser
    } = props

    // state hook variables
    const [open, setOpen] = useState(false)

    const closeSideNav = () => setOpen(!open)

    const openSideNav = () => setOpen(!open)

    // get tags when component mounts
    useEffect(() => {
        getTags()
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // get recipes when component mounts
    useEffect(() => {
        // reset: true
        // limit: 25
        // skip: 0
        // sortMethod: 'mostLovedRecipes'
        // days: 30
        getRecipes(true, 25, 0, 'mostLovedRecipes', 30)

        // reset: true
        // limit: 25
        // skip: 0
        // sortMethod: 'newRecipes'
        // days: null
        getRecipes(true, 25, 0, 'newRecipes', null)

        // reset: true
        // limit: 25
        // skip: 0
        // sortMethod: 'topRecipes'
        // days: 30
        getRecipes(true, 25, 0, 'topRecipes', 30)

        // reset: true
        // limit: 25
        // skip: 0
        // sortMethod: 'trendingRecipes'
        // days: 30
        getRecipes(true, 25, 0, 'trendingRecipes', 30)

		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // get recipe counts when component mounts
    useEffect(() => {
        // sortMethod: 'mostLovedRecipes'
        // days: 30
        countRecipes('mostLovedRecipes', 30)

        // sortMethod: 'newRecipes'
        // days: 30
        countRecipes('newRecipes', 30)

        // sortMethod: 'topRecipes'
        // days: 30
        countRecipes('topRecipes', 30)

        // sortMethod: 'trendingRecipes'
        // days: 30
        countRecipes('trendingRecipes', 30)

		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Router>
            <div id="app-content">
                <Navbar
                    auth={auth}
                    openSideNav={openSideNav}
                    signOutUser={signOutUser}
                />
                <SideNav
                    auth={auth}
                    closeSideNav={closeSideNav}
                    open={open}
                    signOutUser={signOutUser}
                />
                <div className="my-3" id="router-content">
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/forgot-password" component={ForgotPassword} />
                        <Route exact path="/recipes" component={GetRecipes} />
                        <Route exact path="/recipes/create" component={PostRecipe} />
                        <Route exact path="/recipes/:recipeSlug/:recipeId" component={GetRecipe} />
                        <Route exact path="/recipes/:recipeSlug/:recipeId/edit" component={PutRecipe} />
                        <Route exact path="/reset-password/:token" component={ResetPassword} />
                        <Route path="/shop" component={Shop} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/account/:userSlug" component={Account} />
                        <Route path="/privacy-policy" component={PrivacyPolicy} />
                        <Route path="/terms-and-conditions" component={TermsAndConditions} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

App.propTypes = {
    auth: PropTypes.object,
    countRecipes: PropTypes.func,
    getRecipes: PropTypes.func,
    getTags: PropTypes.func,
    signOutUser: PropTypes.func
}

const mapStateToProps = state => ({
    auth: state.auth
})

const actionCreators = {
    countRecipes,
    getRecipes,
    getTags,
    signOutUser
}

export default connect(mapStateToProps, actionCreators)(App)
