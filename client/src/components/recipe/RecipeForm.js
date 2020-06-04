// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import RecipeAddIngredientItem from './RecipeAddIngredientItem'
import RecipeAddListItem from './RecipeAddListItem'
import RecipeDescription from './RecipeDescription'
import RecipeErrors from './RecipeErrors'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeList from './RecipeList'
import RecipeNotes from './RecipeNotes'
import RecipeNumber from './RecipeNumber'
import RecipePhoto from './RecipePhoto'
import RecipeShare from './RecipeShare'
import RecipeSubmit from './RecipeSubmit'
import RecipeTags from './RecipeTags'
import RecipeTime from './RecipeTime'
import RecipeTitle from './RecipeTitle'
import RecipeYield from './RecipeYield'

// import validation
import validateRecipe from '../../validation/recipe'

const RecipeForm = props => {
    // destructure props
    const {
        history,
        errors,
        recipe,
        recipeAction,
        tags,
        uploadAction,
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
    const [photoStatus, setPhotoStatus] = useState(undefined)
    const [transmitting, setTransmitting] = useState(false)

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const submitRecipe = () => {
        // compile recipe properties
        const recipeData = {
            id: recipe._id,
            user: user.id,
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
            recipeAction(recipeData, photoStatus, history)
        }
    }

    // update state when errors prop changes
    useEffect(() => {
        setApplicationErrors(errors)
        setTransmitting(false)
    }, [errors])

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
                        errors={validationErrors}
                        initValue={recipe.title}
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
                        initValue={recipe.description}
                        liftState={setDescription}
                        resolveErrors={resolveValidationErrors}
                    />
                </div>
                <div className="col s12 l6">
                    <RecipePhoto
                        errors={validationErrors}
                        initValue={recipe.photo}
                        liftState={setPhoto}
                        photoStatus={photoStatus}
                        resolveErrors={resolveValidationErrors}
                        setPhotoStatus={setPhotoStatus}
                        uploadAction={uploadAction}
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
                        initValue={recipe.prepTime}
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
                        initValue={recipe.cookTime}
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
                    <RecipeNumber
                        errors={validationErrors}
                        initValue={recipe.servings}
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
                        initValue={recipe.production}
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
                        initValue={recipe.preparations}
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
                        initValue={recipe.ingredients}
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
                        initValue={recipe.instructions}
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
                        initValue={recipe.notes}
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
                        initValue={recipe.tagList}
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
                        initValue={recipe.share}
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

RecipeForm.propTypes = {
    history: PropTypes.object,
    errors: PropTypes.object,
    recipe: PropTypes.object,
    recipeAction: PropTypes.func,
    tags: PropTypes.array,
    uploadAction: PropTypes.func,
    user: PropTypes.object
}

export default RecipeForm
