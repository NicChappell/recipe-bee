// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// import actions
import {
    getRecipe,
    getRecipes,
    updateRecipe
} from '../actions/recipeActions'
import { getTags } from '../actions/tagActions'

// import components
import Autocomplete from '../components/utility/Autocomplete'
import RecipesList from '../components/recipe/RecipesList'

const GetRecipes = props => {
    // state hook variables
    const [arrayHalves, setArrayHalves] = useState([[], []])
    const [filters, setFilters] = useState([])
    const [options, setOptions] = useState([])
    const [sortMethod, setSortMethod] = useState('trendingRecipes')

    // destructure props
    const {
        auth,
        errors,
        getRecipe,
        getRecipes,
        getTags,
        recipes,
        tags,
        updateRecipe,
        utilities
    } = props

    // destructure auth object
    const {
        isAuthenticated,
        user
    } = auth

    // destructure recipes object
    const {
        mostLovedRecipes,
        newRecipes,
        topRecipes,
        trendingRecipes
    } = recipes

    // destructure utilities object
    const { routerHeight } = utilities

    // add filter
    const addFilter = filter => {
        setFilters([...filters, filter])

        const updatedOptions = options.filter(option => option !== filter)
        setOptions(updatedOptions)
    }

    // remove filter
    const removeFilter = filter => {
        const updatedFilters = filters.filter(tag => tag !== filter)
        setFilters(updatedFilters)

        setOptions([...options, filter])
    }

    const halveArray = (arr, updateState) => {
        // create local variables
        const firstHalf = []
        const secondHalf = []

        arr.forEach((item, index) => {
            if (index % 2 === 0) {
                firstHalf.push(item)
            } else {
                secondHalf.push(item)
            }
        })

        // update state
        updateState([firstHalf, secondHalf])
    }

    const handleScroll = e => {
        // destructure event.target
        const {
            clientHeight,
            scrollHeight,
            scrollTop,
        } = e.target

        // calculate scroll bottom
        const bottom = scrollHeight - scrollTop === clientHeight
        // calculate lazy load
        const lazyLoad = scrollHeight - scrollTop === clientHeight + 300

        // load more content
        if (bottom || lazyLoad) {
            // dispatch getRecipes action
            //   limit: 10
            //   skip: recipes[sortMethod].length
            //   sortMethod: sortMethod
            getRecipes(10, recipes[sortMethod].length, sortMethod)
        }
    }

    // halve recipes array when filters, recipes or sortMethod changes
    useEffect(() => {
        // get nested recipes array from recipes object
        const nestedRecipesArray = recipes[sortMethod]

        // filter nestedRecipesArray using filters array
        let filteredRecipesArray = []
        if (filters.length) {
            filteredRecipesArray = nestedRecipesArray.filter(recipe => {
                // destructure recipe
                const { tags } = recipe

                // check if any tag matches any filters
                return tags.some(tag => filters.includes(tag.toLowerCase()))
            })
        } else {
            filteredRecipesArray = nestedRecipesArray
        }

        halveArray(filteredRecipesArray, setArrayHalves)
    }, [filters, sortMethod, recipes])

    // set options when tags changes
    useEffect(() => {
        const options = tags.map(tagObj => tagObj.tag)
        setOptions(options)
    }, [tags])

    // get recipe after component mount
    useEffect(() => {
        getRecipe('')
    }, [])

    // get recipes after component mount
    useEffect(() => {
        if (isEmpty(mostLovedRecipes)) {
            // dispatch getRecipes action
            //   limit: 10
            //   skip: 0
            //   sortMethod: 'mostLovedRecipes'
            getRecipes(10, 0, 'mostLovedRecipes')
        }

        if (isEmpty(newRecipes)) {
            // dispatch getRecipes action
            //   limit: 10
            //   skip: 0
            //   sortMethod: 'newRecipes'
            getRecipes(10, 0, 'newRecipes')
        }

        if (isEmpty(topRecipes)) {
            // dispatch getRecipes action
            //   limit: 10
            //   skip: 0
            //   sortMethod: 'topRecipes'
            getRecipes(10, 0, 'topRecipes')
        }

        if (isEmpty(trendingRecipes)) {
            // dispatch getRecipes action
            //   limit: 10
            //   skip: 0
            //   sortMethod: 'trendingRecipes'
            getRecipes(10, 0, 'trendingRecipes')
        }
    }, [])

    // get tags after component mount
    useEffect(() => {
        if (isEmpty(tags)) {
            getTags()
        }
    }, [])

    if (!isEmpty(errors)) {
        console.log(errors)
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="center-align col s12">
                        <p>There's been an error. Check the console.</p>
                    </div>
                </div>
            </div>
        )
    }

    console.log(recipes[sortMethod])

    return (
        <div className="container router" id="get-recipes" onScroll={handleScroll} style={{ height: routerHeight }}>
            <div className="row">
                <div className="col s12 l6 recipe-sort-methods">
                    <button className={`btn-flat ${sortMethod === 'trendingRecipes' ? 'active' : null}`} onClick={() => setSortMethod('trendingRecipes')}><i className="material-icons left">trending_up</i>trending</button>
                    <button className={`btn-flat ${sortMethod === 'topRecipes' ? 'active' : null}`} onClick={() => setSortMethod('topRecipes')}><i className="material-icons left">thumb_up</i>top</button>
                    <button className={`btn-flat ${sortMethod === 'mostLovedRecipes' ? 'active' : null}`} onClick={() => setSortMethod('mostLovedRecipes')}><i className="material-icons left">favorite</i>loved</button>
                    <button className={`btn-flat ${sortMethod === 'newRecipes' ? 'active' : null}`} onClick={() => setSortMethod('newRecipes')}><i className="material-icons left">new_releases</i>new</button>
                </div>
                <div className="col s12 l3 recipe-tag-search">
                    <Autocomplete
                        options={options}
                        liftState={addFilter}
                    />
                </div>
                <div className="col s12 l3 recipe-tag-list">
                    {filters.map(filter => {
                        return (
                            <div className="chip orange lighten-2" key={filter}>
                                <i className="close material-icons" onClick={() => removeFilter(filter)}>close</i>
                                <span>{filter.toUpperCase()}</span>
                            </div>
                        )
                    }).reverse()}
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <span className="sm-text">
                        {`${recipes[sortMethod].length} recipes found`}
                    </span>
                </div>
            </div>
            <RecipesList
                isAuthenticated={isAuthenticated}
                recipes={arrayHalves}
                updateRecipe={updateRecipe}
                user={user}
            />
        </div>
    )
}

GetRecipes.propTypes = {
    auth: PropTypes.object,
    errors: PropTypes.object,
    getRecipe: PropTypes.func,
    getRecipes: PropTypes.func,
    getTags: PropTypes.func,
    recipes: PropTypes.object,
    tags: PropTypes.array,
    updateRecipe: PropTypes.func,
    utilities: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes,
    tags: state.tags,
    utilities: state.utilities
})

export default connect(
    mapStateToProps,
    { getRecipe, getRecipes, getTags, updateRecipe }
)(GetRecipes)
