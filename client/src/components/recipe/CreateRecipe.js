// import dependencies
import React, { useState } from 'react'

// import components
import RecipeDescription from './RecipeDescription'
import CreateRecipeIngredient from './CreateRecipeIngredient'
import CreateRecipeInstruction from './CreateRecipeInstruction'
import CreateRecipePhoto from './CreateRecipePhoto'
import RecipeAddPreparation from './RecipeAddPreparation'
import RecipePreparationsList from './RecipePreparationsList'
import RecipeShare from './RecipeShare'
import RecipeTags from './RecipeTags'
import RecipeTime from './RecipeTime'
import RecipeTitle from './RecipeTitle'
import InstructionsList from './InstructionsList'
import IngredientsList from './IngredientsList'

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

	// add photo to recipe
	const addPhoto = e => {
		// access the uploaded file from the files array
		const file = e.target.files[0]

		// create a new FileReader object
		const reader = new FileReader()

		if (file) {
			// The progress event is fired periodically as the FileReader reads data
			reader.onprogress = e => {
				// evt is an ProgressEvent.
				if (e.lengthComputable) {
					var percentLoaded = Math.round((e.loaded / e.total) * 100)
					console.log(percentLoaded)
				}
			}

			// The load event is fired when a file has been read successfully
			reader.onload = e => {
				// update state
				setPhoto(e.target.result)
			}

			// the readAsDataURL method is used to read the contents of the specified file
			// when the read operation is finished, the the loadend event is triggered
			// at that time, the result attribute contains the data as a data: URL
			// which represents the file's data as a base64 encoded string
			reader.readAsDataURL(file)
		}
	}
	// remove photo from recipe
	const removePhoto = e => {
		// update state
		setPhoto(undefined)
	}

	// add new ingredient to ingredients array
	const addIngredient = ingredient => setIngredients([...ingredients, ingredient])
	// delete ingredient from ingredients array
	const deleteIngredient = ingredient => {
		// filter target ingredient from ingredients array
		const updatedIngredients = ingredients.filter(obj => obj.id !== ingredient.id)

		// update state
		setIngredients(updatedIngredients)
	}
	// update ingredient in ingredients array
	const updateIngredient = ingredient => {
		// find index of target ingredient in ingredients array
		const index = ingredients.findIndex(obj => obj.id === ingredient.id)

		// make a mutable copy of ingredients array
		const updatedIngredients = ingredients

		// update target ingredient in ingredients array
		updatedIngredients[index] = ingredient

		// update state
		setIngredients(updatedIngredients)
	}

	// add new instruction to instructions array
	const addInstruction = instruction => setInstructions([...instructions, instruction])
	// delete instruction from instructions array
	const deleteInstruction = instruction => {
		// filter target instruction from instructions array
		const updatedInstructions = instructions.filter(obj => obj.id !== instruction.id)

		// update state
		setInstructions(updatedInstructions)
	}
	// update instruction in instructions array
	const updateInstruction = instruction => {
		// find index of target instruction in instructions array
		const index = instructions.findIndex(obj => obj.id === instruction.id)

		// make a mutable copy of instructions array
		const updatedInstructions = instructions

		// update target instruction in instructions array
		updatedInstructions[index] = instruction

		// update state
		setInstructions(updatedInstructions)
	}

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
				<div className="col s12 m6">
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
				<div className="col s12 m6">
					<CreateRecipePhoto
						addPhoto={addPhoto}
						photo={photo}
						removePhoto={removePhoto}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m6 l4">
					<RecipeTime
						config={{ name: 'Prep' }}
						liftHours={setPrepTimeHours}
						liftMinutes={setPrepTimeMinutes}
						valid={validPrepTime}
						validate={setValidPrepTime}
					/>
				</div>
				<div className="col s12 m6 l4 push-l2">
					<RecipeTime
						config={{ name: 'Cook' }}
						liftHours={setCookTimeHours}
						liftMinutes={setCookTimeMinutes}
						valid={validCookTime}
						validate={setValidCookTime}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<h5>Preparations</h5>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
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
					<h5>Ingredients</h5>
				</div>
			</div>
			<div className={`row ${ingredients.length > 0 ? 'ingredients' : null}`}>
				<div className="col s12">
					{ingredients.map((ingredient, index) => {
						return (
							<IngredientsList
								deleteIngredient={deleteIngredient}
								index={index}
								ingredient={ingredient}
								key={ingredient.id}
								updateIngredient={updateIngredient}
							/>
						)
					})}
				</div>
			</div>
			<div className="row">
				<CreateRecipeIngredient
					addIngredient={addIngredient}
					index={ingredients.length + 1}
				/>
			</div>
			<div className="row">
				<div className="col s12">
					<h5>Instructions</h5>
				</div>
			</div>
			<div className={`row ${instructions.length > 0 ? 'instructions' : null}`}>
				<div className="col s12">
					{instructions.map((instruction, index) => (
						<InstructionsList
							deleteInstruction={deleteInstruction}
							index={index}
							instruction={instruction}
							key={instruction.id}
							updateInstruction={updateInstruction}
						/>
					))}
				</div>
			</div>
			<div className="row">
				<CreateRecipeInstruction
					addInstruction={addInstruction}
					index={instructions.length + 1}
				/>
			</div>
			<div className="row">
				<div className="col s8">
					<RecipeTags
						liftState={setTagList}
						tags={tags}
						valid={validTags}
						validate={setValidTags}
					/>
				</div>
				<div className="col s4">
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
