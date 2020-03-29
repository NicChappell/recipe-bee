// import dependencies
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

// import components
import CreateRecipeDescription from './CreateRecipeDescription'
import CreateRecipeIngredient from './CreateRecipeIngredient'
import CreateRecipeInstruction from './CreateRecipeInstruction'
import CreateRecipePhoto from './CreateRecipePhoto'
import CreateRecipePreparation from './CreateRecipePreparation'
import CreateRecipeTags from './CreateRecipeTags'
import CreateRecipeTime from './CreateRecipeTime'
import CreateRecipeTitle from './CreateRecipeTitle'
import InstructionsList from './InstructionsList'
import IngredientsList from './IngredientsList'
import PreparationsList from './PreparationsList'
import Autocomplete from '../utility/Autocomplete'
import ShareSetting from '../utility/ShareSetting'

const CreateRecipe = props => {
    // state hook variables
    const [cookTimeHours, setCookTimeHours] = useState(0)
    const [cookTimeMinutes, setCookTimeMinutes] = useState(0)
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [options, setOptions] = useState([])
    const [photo, setPhoto] = useState(undefined)
    const [prepTimeHours, setPrepTimeHours] = useState(0)
    const [prepTimeMinutes, setPrepTimeMinutes] = useState(0)
    const [preparations, setPreparations] = useState([])
    const [share, setShare] = useState(true)
    const [tagList, setTagList] = useState([])
    const [title, setTitle] = useState('')
    const [validCookTime, setValidCookTime] = useState(true)
    const [validDescription, setValidDescription] = useState(true)
    const [validInstructions, setValidInstructions] = useState(true)
    const [validIngredients, setValidIngredients] = useState(true)
    const [validPrepTime, setValidPrepTime] = useState(true)
    // const [validPreparations, setValidPreparations] = useState(true)
    // const [validShare, setValidShare] = useState(true)
    // const [validTags, setValidTags] = useState(true)
    const [validTitle, setValidTitle] = useState(true)

    // destructure props
    const {
        addRecipe,
        history,
        tags
    } = props

    // add recipe title
    const recipeTitle = title => setTitle(title)

    // add recipe description
    const recipeDescription = description => setDescription(description)

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

    // add tag
    const addTag = tag => {
        setTagList([...tagList, tag])

        const updatedOptions = options.filter(option => option !== tag)
        setOptions(updatedOptions)
    }
    // remove tag
    const removeTag = tag => {
        const updatedTagList = tagList.filter(tagName => tagName !== tag)
        setTagList(updatedTagList)

        setOptions([...options, tag])
    }

    // share setting
    const shareSetting = check => setShare(check)

    // add recipe prep time hours
    const recipePrepTimeHours = hours => console.log(`recipePrepTimeHours: ${hours}`) // setPrepTimeHours(hours)
    // add recipe prep time minutes
    const recipePrepTimeMinutes = minutes => console.log(`recipePrepTimeMinutes: ${minutes}`) // setPrepTimeMinutes(minutes)

    // add recipe cook time hours
    const recipeCookTimeHours = hours => console.log(`recipeCookTimeHours: ${hours}`) // setCookTimeHours(hours)
    // add recipe cook time minutes
    const recipeCookTimeMinutes = minutes => console.log(`recipeCookTimeMinutes: ${minutes}`) // setCookTimeMinutes(minutes)

    // add new preparation to preparations array
    const addPreparation = preparation => setPreparations([...preparations, preparation])
    // delete preparation from preparations array
    const deletePreparation = preparation => {
        // filter target preparation from preparations array
        const updatedPreparations = preparations.filter(obj => obj.id !== preparation.id)

        // update state
        setPreparations(updatedPreparations)
    }
    // update preparation in preparations array
    const updatePreparation = preparation => {
        // find index of target preparation in preparations array
        const index = preparations.findIndex(obj => obj.id === preparation.id)

        // make a mutable copy of preparations array
        const updatedPreparations = preparations

        // update target preparation in preparations array
        updatedPreparations[index] = preparation

        // update state
        setPreparations(updatedPreparations)
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
            options,
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
        //     console.log('invalid description')

        //     // update state
        //     setValidDescription(false)
        // }
        // if (ingredients.length === 0) {
        //     console.log('invalid ingredients')

        //     // update state
        //     setValidIngredients(false)
        // }
        // if (instructions.length === 0) {
        //     console.log('invalid instructions')
        // }
        // if (!title.value) {
        //     console.log('invalid title')

        //     // update state
        //     setValidTitle(false)
        // }

        // if (
        //     validDescription &&
        //     validInstructions &&
        //     // validPhotoSource &&
        //     validIngredients &&
        //     validTitle
        // ) {
        //     addRecipe(recipe)
        //     history.push(`/recipes/${recipe.id}`)
        // }
    }

    // set options when tags changes
    useEffect(() => {
        const options = tags.map(tagObj => tagObj.tag)
        setOptions(options)
    }, [tags])

    return (
        <div className="card-panel white">
            <div className="row">
                <div className="col s12 m6">
                    <div className={validTitle ? '' : 'invalid-recipe-title'}>
                        <CreateRecipeTitle recipeTitle={recipeTitle} />
                    </div>
                    <div className={validDescription ? '' : 'invalid-recipe-description'}>
                        <CreateRecipeDescription recipeDescription={recipeDescription} />
                    </div>
                </div>
                <CreateRecipePhoto
                    addPhoto={addPhoto}
                    photo={photo}
                    removePhoto={removePhoto}
                />
            </div>
            <div className="row">
                <div className="col s12">
                    <h5>Tags</h5>
                </div>
            </div>
            <div className="row">
                <div className="col s12 l4 recipe-tag-search">
                    <Autocomplete
                        options={options}
                        liftState={addTag}
                    />
                </div>
                <div className="col s12 l4 recipe-tags">
                    {tagList.map(tag => {
                        return (
                            <div className="chip orange lighten-2" key={tag}>
                                {tag.toUpperCase()}
                                <i className="close material-icons" onClick={() => removeTag(tag)}>close</i>
                            </div>
                        )
                    })}
                </div>
                <div className="col s12 l4 recipe-share-setting">
                    <ShareSetting liftState={shareSetting} />
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6">
                    <CreateRecipeTime
                        liftHours={recipePrepTimeHours}
                        liftMinutes={recipePrepTimeMinutes}
                        type="Prep"
                    />
                </div>
                <div className="col s12 m6">
                    <CreateRecipeTime
                        liftHours={recipeCookTimeHours}
                        liftMinutes={recipeCookTimeMinutes}
                        type="Cook"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h5>Preparation</h5>
                </div>
            </div>
            <div className={`row ${preparations.length > 0 ? 'preparations' : null}`}>
                <div className="col s12">
                    {preparations.map((preparation, index) => (
                        <PreparationsList
                            deletePreparation={deletePreparation}
                            index={index}
                            preparation={preparation}
                            key={preparation.id}
                            updatePreparation={updatePreparation}
                        />
                    ))}
                </div>
            </div>
            <div className={validInstructions ? '' : 'invalid-recipe-instructions'}>
                <CreateRecipePreparation
                    addPreparation={addPreparation}
                    index={instructions.length + 1}
                />
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
            <div className={validIngredients ? '' : 'invalid-recipe-ingredients'}>
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
            <div className={validInstructions ? '' : 'invalid-recipe-instructions'}>
                <CreateRecipeInstruction
                    addInstruction={addInstruction}
                    index={instructions.length + 1}
                />
            </div>
            <div className="row">
                <div className={`col s12 center-align ${validInstructions ? null : 'mt-2'}`}>
                    <button className="black-text btn orange lighten-2" onClick={submitRecipe}>
                        Save Recipe
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe
