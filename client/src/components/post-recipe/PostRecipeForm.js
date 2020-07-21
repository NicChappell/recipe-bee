// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import RecipeAddIngredientItem from '../recipe/RecipeAddIngredientItem'
import RecipeAddListItem from '../recipe/RecipeAddListItem'
import RecipeDescription from '../recipe/RecipeDescription'
import RecipeErrors from '../recipe/RecipeErrors'
import RecipeIngredientsList from '../recipe/RecipeIngredientsList'
import RecipeList from '../recipe/RecipeList'
import RecipeNotes from '../recipe/RecipeNotes'
import RecipeServings from '../recipe/RecipeServings'
import RecipePhoto from '../recipe/RecipePhoto'
import RecipeShare from '../recipe/RecipeShare'
import RecipeSubmit from '../recipe/RecipeSubmit'
import RecipeTags from '../recipe/RecipeTags'
import RecipeTime from '../recipe/RecipeTime'
import RecipeTitle from '../recipe/RecipeTitle'
import RecipeYield from '../recipe/RecipeYield'

// import validation
import validateRecipe from '../../validation/recipe'

const CreateRecipeForm = props => {
    // destructure props
    const {
        history,
        errors,
        recipeAction,
        tags,
        user
    } = props

    // state hook variables
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState(undefined)
    const [prepTimeHours, setPrepTimeHours] = useState(0)
    const [prepTimeMinutes, setPrepTimeMinutes] = useState(0)
    const [cookTimeHours, setCookTimeHours] = useState(0)
    const [cookTimeMinutes, setCookTimeMinutes] = useState(0)
    const [servings, setServings] = useState(0)
    const [production, setProduction] = useState(0)
    const [preparations, setPreparations] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [notes, setNotes] = useState('')
    const [tagList, setTagList] = useState([])
    const [share, setShare] = useState(false)
    const [applicationErrors, setApplicationErrors] = useState({})
    const [validationErrors, setValidationErrors] = useState({})
    const [transmitting, setTransmitting] = useState(false)

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const submitRecipe = () => {
        // compile recipe properties
        const recipeData = {
            user: user._id,
            title,
            slug,
            description,
            photo,
            prepTimeHours,
            prepTimeMinutes,
            cookTimeHours,
            cookTimeMinutes,
            servings,
            production,
            preparations,
            ingredients,
            instructions,
            notes,
            tagList,
            share
        }

        // validate user input
        const validate = validateRecipe(recipeData)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        } else {
            setTransmitting(true)
            recipeAction(recipeData, history)
        }
    }

    // update state when errors prop changes
    useEffect(() => {
        setApplicationErrors(errors)
        setTransmitting(false)
    }, [errors])

    return (
        <div className="card-panel left-align">
            <div className="row">
                <div className="col s12 l6">
                    <div className="row">
                        <div className="col s12">
                            <h5>Title</h5>
                        </div>
                    </div>
                    <RecipeTitle
                        errors={validationErrors}
                        initValue={undefined}
                        liftSlug={setSlug}
                        liftState={setTitle}
                        resolveErrors={resolveValidationErrors}
                    />
                    <div className="row">
                        <div className="col s12">
                            <h5>Description</h5>
                        </div>
                    </div>
                    <RecipeDescription
                        errors={validationErrors}
                        initValue={undefined}
                        liftState={setDescription}
                        resolveErrors={resolveValidationErrors}
                    />
                </div>
                <div className="col s12 l6">
                    <RecipePhoto
                        errors={validationErrors}
                        liftState={setPhoto}
                        resolveErrors={resolveValidationErrors}
                    />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col s12 m6 xl4">
                    <div className="row">
                        <div className="col s12">
                            <h5>Prep Time</h5>
                        </div>
                    </div>
                    <RecipeTime
                        errors={validationErrors}
                        initValue={undefined}
                        liftHours={setPrepTimeHours}
                        liftMinutes={setPrepTimeMinutes}
                        name={'prepTime'}
                        resolveErrors={resolveValidationErrors}
                    />
                </div>
                <div className="col s12 m6 xl4 push-xl2">
                    <div className="row">
                        <div className="col s12">
                            <h5>Cook Time</h5>
                        </div>
                    </div>
                    <RecipeTime
                        errors={validationErrors}
                        initValue={undefined}
                        liftHours={setCookTimeHours}
                        liftMinutes={setCookTimeMinutes}
                        name={'cookTime'}
                        resolveErrors={resolveValidationErrors}
                    />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col s5 m4 l3 xl2">
                    <div className="row mb-1">
                        <div className="col s12">
                            <h5>Servings</h5>
                        </div>
                    </div>
                    <RecipeServings
                        errors={validationErrors}
                        initValue={undefined}
                        liftState={setServings}
                        name={'servings'}
                        resolveErrors={resolveValidationErrors}
                    />
                </div>
                <div className="col s7 m8 l9 xl10">
                    <div className="row mb-1">
                        <div className="col s12">
                            <h5>Yield</h5>
                        </div>
                    </div>
                    <RecipeYield
                        errors={validationErrors}
                        initValue={undefined}
                        liftState={setProduction}
                        resolveErrors={resolveValidationErrors}
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
                        initValue={undefined}
                        liftState={setPreparations}
                        list={preparations}
                        placeholder={'Preparation'}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <RecipeAddListItem
                        errors={validationErrors}
                        index={preparations.length}
                        liftState={setPreparations}
                        listItems={preparations}
                        name={'preparations'}
                        placeholder={'Preparation (e.g. Wash and dry all produce)'}
                        resolveErrors={resolveValidationErrors}
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
                        initValue={undefined}
                        liftState={setIngredients}
                        ingredients={ingredients}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <RecipeAddIngredientItem
                        errors={validationErrors}
                        index={ingredients.length}
                        ingredients={ingredients}
                        liftState={setIngredients}
                        resolveErrors={resolveValidationErrors}
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
                        initValue={undefined}
                        liftState={setInstructions}
                        list={instructions}
                        placeholder={'Instruction'}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <RecipeAddListItem
                        errors={validationErrors}
                        index={instructions.length}
                        liftState={setInstructions}
                        listItems={instructions}
                        name={'instructions'}
                        placeholder={'Instruction (e.g. Combine ingredients and mix thoroughly)'}
                        resolveErrors={resolveValidationErrors}
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
                    <RecipeNotes
                        initValue={undefined}
                        liftState={setNotes}
                    />
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
                        errors={validationErrors}
                        initValue={undefined}
                        liftState={setTagList}
                        resolveErrors={resolveValidationErrors}
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
                        errors={validationErrors}
                        initValue={undefined}
                        liftState={setShare}
                        resolveErrors={resolveValidationErrors}
                    />
                </div>
            </div>
            <RecipeSubmit
                handleClick={submitRecipe}
                transmitting={transmitting}
            />
            <RecipeErrors
                applicationErrors={applicationErrors}
                validationErrors={validationErrors}
            />
        </div>
    )
}

CreateRecipeForm.propTypes = {
    errors: PropTypes.object,
    history: PropTypes.object,
    recipeAction: PropTypes.func,
    tags: PropTypes.array,
    user: PropTypes.object
}

export default CreateRecipeForm
