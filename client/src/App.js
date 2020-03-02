// import dependencies
import React, { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import auth actions
import { signOutUser } from './actions/authActions'

// import default screen
import Home from './screens/Home'
// import recipe screens
import GetRecipe from './screens/GetRecipe'
import GetRecipes from './screens/GetRecipes'
import NewRecipe from './screens/NewRecipe'
import UpdateRecipe from './screens/UpdateRecipe'
// import shopping screens
import GetShoppingList from './screens/GetShoppingList'
import GetShoppingLists from './screens/GetShoppingLists'
import NewShoppingList from './screens/NewShoppingList'
import UpdateShoppingList from './screens/UpdateShoppingList'
// import auth screens
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
// import account screens
import Account from './screens/Account'
// import unmatched screen
import NoMatch from './screens/NoMatch'

// import layout components
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import SideNav from './components/layout/SideNav'

// import styles
import './styles/styles.css'

const App = props => {
	// state variables
	const [open, setOpen] = useState(false)
	const [recipes, setRecipes] = useState([])

	// destructure props
	const {
		auth,
		signOutUser
	} = props
	console.log(auth)

	const addRecipe = recipe => {
		setRecipes([...recipes, recipe])
	}

	// close side nav
	const closeSideNav = () => {
		console.log('close click')
		setOpen(!open)
	}

	// open side nav
	const openSideNav = () => {
		console.log('open click')
		setOpen(!open)
	}

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
				<div id="router-content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/recipes">
							<GetRecipes recipes={recipes} />
						</Route>
						<Route exact path="/recipes/create">
							<NewRecipe addRecipe={addRecipe} />
						</Route>
						<Route path="/recipes/:id">
							<GetRecipe recipes={recipes} />
						</Route>
							<Route path="/recipes/edit/:id" component={UpdateRecipe} />
						<Route exact path="/shopping-lists" component={GetShoppingLists} />
						<Route exact path="/shopping-lists/create" component={NewShoppingList} />
						<Route path="/shopping-lists/:id" component={GetShoppingList} />
						<Route path="/shopping-lists/edit/:id" component={UpdateShoppingList} />
						<Route path="/sign-in" component={SignIn} />
						<Route path="/sign-up" component={SignUp} />
						<Route path="/account/:slug" component={Account} />
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
	signOutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(
	mapStateToProps,
	{ signOutUser }
)(App)
