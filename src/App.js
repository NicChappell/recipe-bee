import React, { useState } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"

// default screen
import Home from './screens/Home'
// recipe screens
import GetRecipe from './screens/GetRecipe'
import GetRecipes from './screens/GetRecipes'
import NewRecipe from './screens/NewRecipe'
import UpdateRecipe from './screens/UpdateRecipe'
// shopping screens
import GetShoppingList from './screens/GetShoppingList'
import GetShoppingLists from './screens/GetShoppingLists'
import NewShoppingList from './screens/NewShoppingList'
import UpdateShoppingList from './screens/UpdateShoppingList'
// auth screens
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
// account screens
import Account from './screens/Account'
// unmatched screen
import NoMatch from './screens/NoMatch'

// layout components
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import SideNav from './components/layout/SideNav'

// styles
import './styles/styles.css'

const App = () => {
	const [auth, setAuth] = useState(false)
	const [sideNav, setSideNav] = useState(false)
	const [recipes, setRecipes] = useState([])

	const addRecipe = recipe => {
		setRecipes([...recipes, recipe])
	}

	const addShoppingList = shoppingList => {
		console.log('added shopping list')
	}

	const closeSideNav = () => {
		console.log('close click')
		setSideNav(!sideNav)
	}

	const openSideNav = () => {
		console.log('open click')
		setSideNav(!sideNav)
	}

	const signIn = () => {
		console.log('sign in click')
		setAuth(!auth)
	}

	const signOut = () => {
		console.log('sign out click')
		setAuth(!auth)
	}

	return (
		<Router>
			<div id="app-content">
				<Navbar
					auth={auth}
					openSideNav={openSideNav}
					signIn={signIn}
					signOut={signOut}
				/>
				<SideNav
					auth={auth}
					closeSideNav={closeSideNav}
					sideNav={sideNav}
					signIn={signIn}
					signOut={signOut}
				/>
				<div id="router-content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/recipes" render={props => <GetRecipes {...props} recipes={recipes} />} />
						<Route exact path="/recipes/create" render={props => <NewRecipe {...props} addRecipe={addRecipe} />} />
						<Route path="/recipes/:id" render={props => <GetRecipe {...props} recipes={recipes} />} />
						<Route path="/recipes/edit/:id" component={UpdateRecipe} />
						<Route exact path="/shopping-lists" component={GetShoppingLists} />
						<Route exact path="/shopping-lists/create" render={props => <NewShoppingList {...props} addShoppingList={addShoppingList} />} />
						<Route path="/shopping-lists/:id" component={GetShoppingList} />
						<Route path="/shopping-lists/edit/:id" component={UpdateShoppingList} />
						<Route path="/sign-in" render={props => <SignIn {...props} auth={auth} signIn={signIn} />} />
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

export default App
