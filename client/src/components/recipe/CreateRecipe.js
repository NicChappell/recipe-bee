// import dependencies
import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash.isempty'

// import components
import ErrorMessage from '../utility/ErrorMessage'
import IndeterminateMessage from '../utility/IndeterminateMessage'
import IndeterminateProgress from '../utility/IndeterminateProgress'
import RecipeAddIngredient from './RecipeAddIngredient'
import RecipeAddListItem from './RecipeAddListItem'
import RecipeDescription from './RecipeDescription'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeList from './RecipeList'
import RecipeNotes from './RecipeNotes'
import RecipeNumber from './RecipeNumber'
import RecipePhoto from './RecipePhoto'
import RecipeShare from './RecipeShare'
import RecipeTags from './RecipeTags'
import RecipeTime from './RecipeTime'
import RecipeTitle from './RecipeTitle'
import RecipeYield from './RecipeYield'
import SaveButton from './SaveButton'

// import validation
import validateRecipe from '../../validation/recipe'

const CreateRecipe = props => {
    // destructure props
    const {
        createRecipe,
        history,
        errors: propsErrors,
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
    const [errors, setErrors] = useState({})
    const [transmitting, setTransmitting] = useState(false)

    const resolveErrors = (...keys) => {
        keys.forEach(key => delete errors[key])
        setErrors(errors)
    }

    const saveRecipe = () => {
        // create new recipe object
        const newRecipe = {
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
        const validate = validateRecipe(newRecipe)

        // check for validation errors
        if (!validate.isValid) {
            setErrors(validate.errors)
        } else {
            setTransmitting(true)
            createRecipe(newRecipe, history)
        }
    }

    // set errors when props errors changes
    useEffect(() => setErrors(propsErrors), [propsErrors])

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
                        liftSlug={setSlug}
                        liftState={setTitle}
                        resolveErrors={resolveErrors}
                    />
                    <div className="row">
                        <div className="col s12">
                            <h5>Description</h5>
                        </div>
                    </div>
                    <RecipeDescription
                        errors={errors}
                        liftState={setDescription}
                        resolveErrors={resolveErrors}
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
                <div className="col s12 m6 xl4">
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
                <div className="col s12 m6 xl4 push-xl2">
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
                <div className="col s5 m4 l3 xl2">
                    <div className="row mb-1">
                        <div className="col s12">
                            <h5>Servings</h5>
                        </div>
                    </div>
                    <RecipeNumber
                        errors={errors}
                        liftState={setServings}
                        name={'servings'}
                        resolveErrors={resolveErrors}
                    />
                </div>
                <div className="col s7 m8 l9 xl10">
                    <div className="row mb-1">
                        <div className="col s12">
                            <h5>Yield</h5>
                        </div>
                    </div>
                    <RecipeYield
                        errors={errors}
                        liftState={setProduction}
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
            <div className="row center-align">
                <div className="col s6 push-s3">
                    {transmitting ? <IndeterminateMessage message='Saving recipe' /> : null}
                    {transmitting ? <IndeterminateProgress /> : null}
                    {transmitting ? null : <SaveButton onClick={saveRecipe} />}
                </div>
            </div>
            {isEmpty(errors) ? null : <ErrorMessage errors={errors} />}
        </div>
    )
}

export default CreateRecipe
