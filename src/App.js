import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"

import Home from './screens/Home'
import Recipes from './screens/Recipes'
import RecipeDetail from './screens/RecipeDetail'
import Groceries from './screens/Groceries'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Account from './screens/Account'
import NoMatch from './screens/NoMatch'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import './styles/styles.css'

function App() {
	return (
		<Router>
			<div id="app-content">
				<Navbar />
				<div id="router-content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/recipes" component={Recipes} />
						<Route path="/recipes/:recipeName" component={RecipeDetail} />
						<Route path="/groceries" component={Groceries} />
						<Route path="/sign-in" component={SignIn} />
						<Route path="/sign-up" component={SignUp} />
						<Route path="/account/:name" component={Account} />
						<Route component={NoMatch} />
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	)
}

export default App
