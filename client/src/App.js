// import dependencies
import React, {
	useEffect,
	useRef,
	useState
} from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import auth actions
import { setRouterHeight } from './actions/utilityActions'
import { signOutUser } from './actions/authActions'

// import custom hooks
import { useWindowSize } from './helpers/customHooks'

// import default screen
import Home from './screens/Home'
// import recipe screens
import GetRecipe from './screens/GetRecipe'
import GetRecipes from './screens/GetRecipes'
import PostRecipe from './screens/PostRecipe'
// import shopping screens
import GetShoppingList from './screens/GetShoppingList'
import GetShoppingLists from './screens/GetShoppingLists'
import PostShoppingList from './screens/PostShoppingList'
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
	// state hook variables
	const [open, setOpen] = useState(false)

	// ref hook variables
	const routerContent = useRef(null)

    // custom hook variables
	const [width, height] = useWindowSize()

	// destructure props
	const {
		auth,
		setRouterHeight,
		signOutUser
	} = props
	console.log(auth)

	const closeSideNav = () => {
		setOpen(!open)
	}

	const openSideNav = () => {
		setOpen(!open)
	}

	// update routerHeight when window size changes
	useEffect(() => {
		// destructure routerContent
		const { current } = routerContent

		// calculate routerContent size and relative position
		const rect = current.getBoundingClientRect()

		// update state
		setRouterHeight(Math.round(rect.height))

		// clean up after this effect
		return () => setRouterHeight(0)
	}, [width, height])

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
				<div className="my-3" id="router-content" ref={routerContent}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/recipes" component={GetRecipes} />
						<Route exact path="/recipes/create" component={PostRecipe} />
						<Route path="/recipes/:recipeSlug/:recipeId" component={GetRecipe} />
						<Route exact path="/shopping-lists" component={GetShoppingLists} />
						<Route exact path="/shopping-lists/create" component={PostShoppingList} />
						<Route path="/shopping-lists/:id" component={GetShoppingList} />
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
	auth: PropTypes.object.isRequired,
	setRouterHeight: PropTypes.func.isRequired,
	signOutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(
	mapStateToProps,
	{ setRouterHeight, signOutUser }
)(App)
