// import dependencies
import React, { useState } from 'react'

// import components
import RecipeAddIngredient from './RecipeAddIngredient'
import RecipeAddListItem from './RecipeAddListItem'
import RecipeDescription from './RecipeDescription'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeList from './RecipeList'
import RecipeNotes from './RecipeNotes'
import RecipePhoto from './RecipePhoto'
import RecipeShare from './RecipeShare'
import RecipeTags from './RecipeTags'
import RecipeTime from './RecipeTime'
import RecipeTitle from './RecipeTitle'

// import validation
import validateRecipe from '../../validation/recipe'

const CreateRecipe = props => {
	// destructure props
	const {
		createRecipe,
		history,
		tags,
		user
	} = props

	// state hook variables
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [photo, setPhoto] = useState(undefined)
	const [prepTimeHours, setPrepTimeHours] = useState(0)
	const [prepTimeMinutes, setPrepTimeMinutes] = useState(0)
	const [cookTimeHours, setCookTimeHours] = useState(0)
	const [cookTimeMinutes, setCookTimeMinutes] = useState(0)
	const [preparations, setPreparations] = useState([])
	const [ingredients, setIngredients] = useState([])
	const [instructions, setInstructions] = useState([])
	const [notes, setNotes] = useState('')
	const [tagList, setTagList] = useState([])
	const [share, setShare] = useState(false)
	// ---------------------------------- //
	const [errors, setErrors] = useState({})

	const resolveErrors = key => {
		delete errors[key]
		setErrors(errors)
	}

	const submitRecipe = () => {
		// create new recipe object
		const newRecipe = {
			user,
			title,
			description,
			photo,
			prepTimeHours,
			prepTimeMinutes,
			cookTimeHours,
			cookTimeMinutes,
			preparations,
			ingredients,
			instructions,
			notes,
			tagList,
			share
		}

		// validate user input
		const validate = validateRecipe(newRecipe)

		// check for validation errors
		!validate.isValid
			? setErrors(validate.errors)
			: createRecipe(newRecipe, history)

		// createRecipe(newRecipe, history)
	}

	return (
		<div className="card-panel white">
			<div className="row">
				<div className="col s12 l6">
					<div className="row">
						<div className="col s12">
							<h5>Title</h5>
						</div>
					</div>
					<RecipeTitle
						errors={errors}
						liftState={setTitle}
					/>
					<div className="row">
						<div className="col s12">
							<h5>Description</h5>
						</div>
					</div>
					<RecipeDescription
						errors={errors}
						liftState={setDescription}
					/>
				</div>
				<div className="col s12 l6">
					<RecipePhoto
						errors={errors}
						liftState={setPhoto}
						resolveErrors={resolveErrors}
					/>
				</div>
			</div>
			<hr />
			<div className="row">
				<div className="col s12 m6 l4">
					<div className="row">
						<div className="col s12">
							<h5>Prep Time</h5>
						</div>
					</div>
					<RecipeTime
						errors={errors}
						liftHours={setPrepTimeHours}
						liftMinutes={setPrepTimeMinutes}
						name={'prepTime'}
						resolveErrors={resolveErrors}
					/>
				</div>
				<div className="col s12 m6 l4 push-l2">
					<div className="row">
						<div className="col s12">
							<h5>Cook Time</h5>
						</div>
					</div>
					<RecipeTime
						errors={errors}
						liftHours={setCookTimeHours}
						liftMinutes={setCookTimeMinutes}
						name={'cookTime'}
						resolveErrors={resolveErrors}
					/>
				</div>
			</div>
			<hr />
			<div className="row">
				<div className="col s12">
					<div className="row">
						<div className="col s12">
							<h5>Preparations</h5>
						</div>
					</div>
					<RecipeList
						liftState={setPreparations}
						list={preparations}
						placeholder={'Preparation'}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<RecipeAddListItem
						errors={errors}
						index={preparations.length}
						liftState={setPreparations}
						listItems={preparations}
						name={'preparations'}
						placeholder={'Preparation (e.g. Wash and dry all produce)'}
						resolveErrors={resolveErrors}
					/>
				</div>
			</div>
			<hr />
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
						errors={errors}
						index={ingredients.length}
						ingredients={ingredients}
						liftState={setIngredients}
						resolveErrors={resolveErrors}
					/>
				</div>
			</div>
			<hr />
			<div className="row">
				<div className="col s12">
					<div className="row">
						<div className="col s12">
							<h5>Instructions</h5>
						</div>
					</div>
					<RecipeList
						liftState={setInstructions}
						list={instructions}
						placeholder={'Instruction'}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<RecipeAddListItem
						errors={errors}
						index={instructions.length}
						liftState={setInstructions}
						listItems={instructions}
						name={'instructions'}
						placeholder={'Instruction (e.g. Combine ingredients and mix thoroughly)'}
						resolveErrors={resolveErrors}
					/>
				</div>
			</div>
			<hr />
			<div className="row">
				<div className="col s12">
					<div className="row">
						<div className="col s12">
							<h5>Notes</h5>
						</div>
					</div>
					<RecipeNotes liftState={setNotes} />
				</div>
			</div>
			<hr />
			<div className="row">
				<div className="col s12 m6 l8">
					<div className="row">
						<div className="col s12">
							<h5>Tags</h5>
						</div>
					</div>
					<RecipeTags
						errors={errors}
						liftState={setTagList}
						resolveErrors={resolveErrors}
						tags={tags}
					/>
				</div>
				<div className="col s12 m6 l4">
					<div className="row">
						<div className="col s12">
							<h5>Share</h5>
						</div>
					</div>
					<RecipeShare
						errors={errors}
						liftState={setShare}
						resolveErrors={resolveErrors}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<div className="row save center-align">
						<div className="col s12">
							<button className="black-text btn-small btn-flat amber lighten-2 mt-1" disabled={false} onClick={submitRecipe}>
								Save Recipe
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateRecipe
