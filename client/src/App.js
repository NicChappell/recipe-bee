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
import { getRecipes } from './actions/recipeActions'
import { getTags } from './actions/tagActions'
import { setCurrentUser } from './actions/userActions'
import { signOutUser } from './actions/authActions'

// import index screen
import Index from './routes/Index'
// import recipe routes
import GetRecipe from './routes/GetRecipe'
import GetRecipes from './routes/GetRecipes'
import PostRecipe from './routes/PostRecipe'
import PutRecipe from './routes/PutRecipe'
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
// import legalese routes
import PrivacyPolicy from './routes/PrivacyPolicy'
import TermsAndConditions from './routes/TermsAndConditions'
// import unmatched screen
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
        getRecipes,
        getTags,
        signOutUser
    } = props
    // console.log(auth)

    // destructure auth
    const { user } = auth
    // console.log(user)

    // state hook variables
    const [open, setOpen] = useState(false)

    const closeSideNav = () => setOpen(!open)

    const openSideNav = () => setOpen(!open)

    // get tags when component mounts
    useEffect(() => getTags(), [])

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
    getRecipes: PropTypes.func,
    getTags: PropTypes.func,
    signOutUser: PropTypes.func
}

const mapStateToProps = state => ({
    auth: state.auth
})

const actionCreators = {
    getRecipes,
    getTags,
    signOutUser
}

export default connect(mapStateToProps, actionCreators)(App)
