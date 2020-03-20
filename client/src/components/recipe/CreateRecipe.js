import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

import CreateRecipeDescription from './CreateRecipeDescription'
import CreateRecipeImage from './CreateRecipeImage'
import CreateRecipeIngredient from './CreateRecipeIngredient'
import CreateRecipeInstruction from './CreateRecipeInstruction'
import CreateRecipeTitle from './CreateRecipeTitle'
import InstructionsList from './InstructionsList'
import IngredientsList from './IngredientsList'

class CreateRecipe extends Component {
    state = {
        description: '',
        image: null,
        ingredients: [],
        instructions: [],
        title: '',
        validDescription: true,
        validInstructions: true,
        validIngredients: true,
        validTitle: true
    }

    // add recipe title
    recipeTitle = title => this.setState({ title })

    // add recipe description
    recipeDescription = description => this.setState({ description })

    // add image to recipe
    addImage = e => {
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
                this.setState({
                    ...this.state,
                    image: e.target.result
                })
            }

            // the readAsDataURL method is used to read the contents of the specified file
            // when the read operation is finished, the the loadend event is triggered
            // at that time, the result attribute contains the data as a data: URL
            // which represents the file's data as a base64 encoded string
            reader.readAsDataURL(file)
        }
    }
    // remove image from recipe
    removeImage = e => {
        // update state
        this.setState({
            ...this.state,
            image: null
        })
    }

    // add new ingredient to ingredients array
    addIngredient = ingredient => {
        // destructure state
        const { ingredients } = this.state

        // update state
        this.setState({
            ...this.state,
            ingredients: [...ingredients, ingredient]
        })
    }
    // delete ingredient from ingredients array
    deleteIngredient = ingredient => {
        // destructure state
        const { ingredients } = this.state

        // filter target ingredient from ingredients array
        const updatedIngredients = ingredients.filter(obj => obj.id !== ingredient.id)

        // update state
        this.setState({
            ...this.state,
            ingredients: updatedIngredients
        })
    }
    // update ingredient in ingredients array
    updateIngredient = ingredient => {
        // destructure state
        const { ingredients } = this.state

        // find index of target ingredient in ingredients array
        const index = ingredients.findIndex(obj => obj.id === ingredient.id)

        // make a mutable copy of ingredients array
        const updatedIngredients = ingredients

        // update target ingredient in ingredients array
        updatedIngredients[index] = ingredient

        // update state
        this.setState({
            ...this.state,
            ingredients: updatedIngredients
        })
    }

    // add new instruction to instructions array
    addInstruction = instruction => {
        // destructure state
        const { instructions } = this.state

        // update state
        this.setState({
            ...this.state,
            instructions: [...instructions, instruction]
        })
    }
    // delete instruction from instructions array
    deleteInstruction = instruction => {
        // destructure state
        const { instructions } = this.state

        // filter target instruction from instructions array
        const updatedInstructions = instructions.filter(obj => obj.id !== instruction.id)

        // update state
        this.setState({
            ...this.state,
            instructions: updatedInstructions
        })
    }
    // update instruction in instructions array
    updateInstruction = instruction => {
        // destructure state
        const { instructions } = this.state

        // find index of target instruction in instructions array
        const index = instructions.findIndex(obj => obj.id === instruction.id)

        // make a mutable copy of instructions array
        const updatedInstructions = instructions

        // update target instruction in instructions array
        updatedInstructions[index] = instruction

        // update state
        this.setState({
            ...this.state,
            instructions: updatedInstructions
        })
    }

    // submit recipe
    submitRecipe = () => {
        // destructure state
        const {
            description,
            image,
            ingredients,
            instructions,
            title,
            validDescription,
            validInstructions,
            validIngredients,
            validTitle
        } = this.state

        // destructure props
        const {
            addRecipe,
            history
        } = this.props

        // generate unique id
        const id = uuid()

        // create new recipe object
        const recipe = {
            id,
            description,
            ingredients,
            instructions,
            image,
            title
        }

        // validate required user inputs
        if (!description.value) {
            console.log('invalid description')

            // update state
            this.setState({ validDescription: false })
        }
        if (ingredients.length === 0) {
            console.log('invalid ingredients')

            // update state
            this.setState({ validIngredients: false })
        }
        if (instructions.length === 0) {
            console.log('invalid instructions')
        }
        if (!title.value) {
            console.log('invalid title')

            // update state
            this.setState({ validTitle: false })
        }

        if (
            validDescription &&
            validInstructions &&
            // validImageSource &&
            validIngredients &&
            validTitle
        ) {
            addRecipe(recipe)
            history.push(`/recipes/${recipe.id}`)
        }
    }

    render() {
        const {
            description,
            image,
            ingredients,
            instructions,
            title,
            validDescription,
            validInstructions,
            validIngredients,
            validTitle
        } = this.state
        console.log(description, image, title)

        return (
            <div className="card-panel white">
                <div className="row">
                    <div className="col s12 m6 l8 xl9">
                        <div className={validTitle ? '' : 'invalid-recipe-title'}>
                            <CreateRecipeTitle recipeTitle={this.recipeTitle} />
                        </div>
                        <div className={validDescription ? '' : 'invalid-recipe-description'}>
                            <CreateRecipeDescription recipeDescription={this.recipeDescription} />
                        </div>
                    </div>
                    <CreateRecipeImage
                        addImg={this.addImage}
                        imgSrc={this.imageSource}
                        rmvImg={this.removeImage}
                    />
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Tags</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        autocomplete form goes here
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="chip">
                            Breakfat
                            <i className="close material-icons">close</i>
                        </div>
                        <div className="chip">
                            Lunch
                            <i className="close material-icons">close</i>
                        </div>
                        <div className="chip">
                            Dinner
                            <i className="close material-icons">close</i>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <h5>Prep Time</h5>
                    </div>
                    <div className="input-field col s6">
                        <input
                            name="prepTime"
                            placeholder="Prep time"
                            type='number'
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <h5>Cook Time</h5>
                    </div>
                    <div className="input-field col s6">
                        <input
                            name="cookTime"
                            placeholder="Cook time"
                            type='number'
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <span className="left mr-1"><i className="material-icons left">share</i> Share settings</span>
                        <div className="switch">
                            <label>
                                Off
                                <input disabled type="checkbox" />
                                <span className="lever"></span>
                                On
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Ingredients</h5>
                    </div>
                </div>
                <div className={`row ${ingredients.length > 0 ? 'ingredients' : ''}`}>
                    <div className="col s12">
                        {ingredients.map((ingredient, index) => {
                            return (
                                <IngredientsList
                                    deleteIngredient={this.deleteIngredient}
                                    index={index}
                                    ingredient={ingredient}
                                    key={ingredient.id}
                                    updateIngredient={this.updateIngredient}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className={validIngredients ? '' : 'invalid-recipe-ingredients'}>
                    <CreateRecipeIngredient
                        addIngredient={this.addIngredient}
                        index={ingredients.length + 1}
                    />
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Preparation</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Instructions</h5>
                    </div>
                </div>
                <div className={`row ${instructions.length > 0 ? 'instructions' : ''}`}>
                    <div className="col s12">
                        {instructions.map((instruction, index) => (
                            <InstructionsList
                                deleteInstruction={this.deleteInstruction}
                                index={index}
                                instruction={instruction}
                                key={instruction.id}
                                updateInstruction={this.updateInstruction}
                            />
                        ))}
                    </div>
                </div>
                <div className={validInstructions ? '' : 'invalid-recipe-instructions'}>
                    <CreateRecipeInstruction
                        addInstruction={this.addInstruction}
                        index={instructions.length + 1}
                    />
                </div>
                <div className="row">
                    <div className={`col s12 center-align ${validInstructions ? null : 'mt-2'}`}>
                        <button className="black-text btn orange lighten-2" onClick={this.submitRecipe}>
                            Save Recipe
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateRecipe
