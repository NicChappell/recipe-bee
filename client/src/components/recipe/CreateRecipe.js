// import dependencies
import React, { useState } from 'react'

// import components
import RecipeAddPreparation from './RecipeAddPreparation'
import RecipeAddIngredient from './RecipeAddIngredient'
import RecipeAddInstruction from './RecipeAddInstruction'
import RecipeDescription from './RecipeDescription'
import RecipePhoto from './RecipePhoto'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeInstructionsList from './RecipeInstructionsList'
import RecipePreparationsList from './RecipePreparationsList'
import RecipeShare from './RecipeShare'
import RecipeTags from './RecipeTags'
import RecipeTime from './RecipeTime'
import RecipeTitle from './RecipeTitle'

const CreateRecipe = props => {
	// state hook variables
	const [cookTimeHours, setCookTimeHours] = useState(0)
	const [cookTimeMinutes, setCookTimeMinutes] = useState(0)
	const [description, setDescription] = useState('')
	const [ingredients, setIngredients] = useState([])
	const [instructions, setInstructions] = useState([])
	const [photo, setPhoto] = useState(undefined)
	const [prepTimeHours, setPrepTimeHours] = useState(0)
	const [prepTimeMinutes, setPrepTimeMinutes] = useState(0)
	const [preparations, setPreparations] = useState([])
	const [share, setShare] = useState(false)
	const [tagList, setTagList] = useState([])
	const [title, setTitle] = useState('')
	const [validCookTime, setValidCookTime] = useState(true)
	const [validDescription, setValidDescription] = useState(true)
	const [validInstructions, setValidInstructions] = useState(true)
	const [validIngredients, setValidIngredients] = useState(true)
	const [validPreparations, setValidPreparations] = useState(true)
	const [validPrepTime, setValidPrepTime] = useState(true)
	const [validShare, setValidShare] = useState(true)
	const [validTags, setValidTags] = useState(true)
	const [validTitle, setValidTitle] = useState(true)

	// destructure props
	const {
		addRecipe,
		history,
		tags
	} = props

	// submit recipe
	const submitRecipe = () => {
		// create new recipe object
		const recipe = {
			cookTimeHours,
			cookTimeMinutes,
			description,
			ingredients,
			instructions,
			photo,
			prepTimeHours,
			prepTimeMinutes,
			preparations,
			share,
			tagList,
			title,
		}
		console.log(recipe)

		// // validate required user inputs
		// if (!description.value) {
		//	 console.log('invalid description')

		//	 // update state
		//	 setValidDescription(false)
		// }
		// if (ingredients.length === 0) {
		//	 console.log('invalid ingredients')

		//	 // update state
		//	 setValidIngredients(false)
		// }
		// if (instructions.length === 0) {
		//	 console.log('invalid instructions')
		// }
		// if (!title.value) {
		//	 console.log('invalid title')

		//	 // update state
		//	 setValidTitle(false)
		// }

		// if (
		//	 validDescription &&
		//	 validInstructions &&
		//	 // validPhotoSource &&
		//	 validIngredients &&
		//	 validTitle
		// ) {
		//	 addRecipe(recipe)
		//	 history.push(`/recipes/${recipe.id}`)
		// }
	}

	return (
		<div className="card-panel white">
			<div className="row">
				<div className="col s12 l6">
					<RecipeTitle
						liftState={setTitle}
						valid={validTitle}
						validate={setValidTitle}
					/>
					<RecipeDescription
						liftState={setDescription}
						valid={validDescription}
						validate={setValidDescription}
					/>
				</div>
				<div className="col s12 l6">
					<RecipePhoto
						liftState={setPhoto}
						photo={photo}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m6 l4">
					<div className="row">
						<div className="col s12">
							<h5>Prep Time</h5>
						</div>
					</div>
					<RecipeTime
						liftHours={setPrepTimeHours}
						liftMinutes={setPrepTimeMinutes}
					/>
				</div>
				<div className="col s12 m6 l4 push-l2">
					<div className="row">
						<div className="col s12">
							<h5>Cook Time</h5>
						</div>
					</div>
					<RecipeTime
						liftHours={setCookTimeHours}
						liftMinutes={setCookTimeMinutes}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<div className="row">
						<div className="col s12">
							<h5>Preparations</h5>
						</div>
					</div>
					<RecipePreparationsList
						liftState={setPreparations}
						preparations={preparations}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<RecipeAddPreparation
						index={preparations.length}
						liftState={setPreparations}
						preparations={preparations}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<div className="row">
						<div className="col s12">
							<h5>Ingredients</h5>
						</div>
					</div>
					<RecipeIngredientsList
						liftState={setIngredients}
						ingredients={ingredients}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<RecipeAddIngredient
						index={ingredients.length}
						liftState={setIngredients}
						ingredients={ingredients}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<div className="row">
						<div className="col s12">
							<h5>Instructions</h5>
						</div>
					</div>
					<RecipeInstructionsList
						liftState={setInstructions}
						instructions={instructions}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<RecipeAddInstruction
						index={instructions.length}
						liftState={setInstructions}
						instructions={instructions}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m6 l8">
					<div className="row">
						<div className="col s12">
							<h5>Tags</h5>
						</div>
					</div>
					<RecipeTags
						liftState={setTagList}
						tags={tags}
						valid={validTags}
						validate={setValidTags}
					/>
				</div>
				<div className="col s12 m6 l4">
					<div className="row">
						<div className="col s12">
							<h5>Share</h5>
						</div>
					</div>
					<RecipeShare
						liftState={setShare}
						valid={validShare}
						validate={setValidShare}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<div className="row save center-align">
						<div className="col s12">
							<button className="black-text btn orange lighten-2" onClick={submitRecipe}>
								Save Recipe
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="row">
				<div className={`col s12 center-align ${validInstructions ? null : 'mt-2'}`}>
					<button className="black-text btn orange lighten-2" onClick={submitRecipe}>
						Save Recipe
					</button>
				</div>
			</div> */}
		</div>
	)
}

export default CreateRecipe
