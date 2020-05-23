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
import { signOutUser } from './actions/authActions'

// import index screen
import Index from './screens/Index'
// import recipe screens
import GetRecipe from './screens/GetRecipe'
import GetRecipes from './screens/GetRecipes'
import PostRecipe from './screens/PostRecipe'
// import auth screens
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
// import account screens
import Account from './screens/Account'
// import legalese screens
import PrivacyPolicy from './screens/PrivacyPolicy'
import TermsAndConditions from './screens/TermsAndConditions'
// import unmatched screen
import NoMatch from './screens/NoMatch'

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
		recipes,
		signOutUser
	} = props

	// state hook variables
	const [open, setOpen] = useState(false)

	const closeSideNav = () => {
		setOpen(!open)
	}

	const openSideNav = () => {
		setOpen(!open)
	}

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
						<Route exact path="/recipes" component={GetRecipes} />
						<Route exact path="/recipes/create" component={PostRecipe} />
						<Route path="/recipes/:recipeSlug/:recipeId" component={GetRecipe} />
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
	auth: state.auth,
    recipes: state.recipes
})

export default connect(
	mapStateToProps,
	{ getRecipes, getTags, signOutUser }
)(App)
