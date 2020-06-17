// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

// import actions
import {
    countRecipes,
    getRecipes,
    updateRecipe
} from '../actions/recipeActions'

// import custom hooks
import { useDidMount } from '../helpers/customHooks'

// import components
import Autocomplete from '../components/utility/Autocomplete'
import IndeterminateMessage from '../components/utility/IndeterminateMessage'
import RecipeBanner from '../components/recipe/RecipeBanner'
import RecipeCardList from '../components/recipe/RecipeCardList'
import DateRanges from '../components/recipe/DateRanges'

const initFetchRecord = {
    trendingRecipes: {
        prevCount: 0,
        currCount: 0,
    },
    topRecipes: {
        prevCount: 0,
        currCount: 0,
    },
    mostLovedRecipes: {
        prevCount: 0,
        currCount: 0,
    },
    newRecipes: {
        prevCount: 0,
        currCount: 0,
    }
}

const GetRecipes = props => {
    // destructure props
    const {
        auth,
        errors,
        countRecipes,
        getRecipes,
        recipes,
        // tags,
        updateRecipe
    } = props
    console.log(recipes)

    // state hook variables
    const [dateRange, setDateRange] = useState('30')
    const [fetchLimit, setFetchLimit] = useState(false)
    const [fetchRecord, setFetchRecord] = useState(initFetchRecord)
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [filters, setFilters] = useState([])
    const [options, setOptions] = useState([])
    const [sortMethod, setSortMethod] = useState('trendingRecipes')

    // custom hook variables
    const didMount = useDidMount()

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // destructure recipes
    const {
        recipesCount,
        searchableRecipes
    } = recipes

    // destructure searchable recipes
    const {
        mostLovedRecipes,
        newRecipes,
        topRecipes,
        trendingRecipes
    } = searchableRecipes

    const addFilter = filter => {
        setFilters([...filters, filter])

        const updatedOptions = options.filter(option => option !== filter)
        setOptions(updatedOptions)
    }

    const appendRecipes = () => {
        if (fetchLimit) {
            console.log(`searchableRecipes[sortMethod].length: ${searchableRecipes[sortMethod].length}`)
            console.log(`recipesCount: ${recipesCount}`)
            console.log(`fetchLimit: ${fetchLimit}`)

            console.log('Stop fetching recipes')
        } else {
            console.log(`searchableRecipes[sortMethod].length: ${searchableRecipes[sortMethod].length}`)
            console.log(`recipesCount: ${recipesCount}`)
            console.log(`fetchLimit: ${fetchLimit}`)

            console.log('fetch more recipes')

            // reset: false
            // limit: 25
            // skip: searchableRecipes[sortMethod].length
            // sortMethod: sortMethod
            // days: dateRange
            getRecipes(false, 25, searchableRecipes[sortMethod].length, sortMethod, dateRange)
        }
    }

    const removeFilter = filter => {
        const updatedFilters = filters.filter(filterName => filterName !== filter)
        setFilters(updatedFilters)

        setOptions([...options, filter])
    }

    const handleSortMethodClick = e => setSortMethod(e.currentTarget.name)

    const handleScroll = () => {
        // skip initial render
        if (didMount) {
            // calculate scroll bottom
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight

            // // load more recipes if at bottom
            if (bottom) { appendRecipes() }
        }
    }

    // set options when searchableRecipes[sortMethod] changes
    useEffect(() => {
        // create mutable copy of options
        const optionsCopy = options.map(option => option)

        // iterate over searchable recipes
        searchableRecipes[sortMethod].forEach(recipe => {
            // destructure recipe
            const { tagList } = recipe

            // itereate over tagList array
            tagList.forEach(tag => {
                // add tag to optionsCopy array if it does not exist
                if (optionsCopy.indexOf(tag) === -1) { optionsCopy.push(tag) }
            })
        })

        // update state
        setOptions(optionsCopy)
    }, [searchableRecipes[sortMethod]])

    // set fetch limit when searchableRecipes[sortMethod] array changes
    useEffect(() => {
        const len = searchableRecipes[sortMethod].length

        if (len >= recipesCount) {
            // console.log('len >= recipesCount')
            setFetchLimit(true)
        } else if (len >= 500) {
            // console.log('len >= 500')
            setFetchLimit(true)
        } else {
            // console.log('len < recipesCount')
            setFetchLimit(false)
        }
    }, [recipesCount, searchableRecipes[sortMethod]])

    // filter recipes when filters or searchableRecipes[sortMethod] changes
    useEffect(() => {
        // check if filters array is empty
        if (isEmpty(filters)) {
            // update state
            setFilteredRecipes(searchableRecipes[sortMethod])

            // return early
            return
        }

        // filter searchableRecipes[sortMethod] array
        const filteredRecipes = searchableRecipes[sortMethod].filter(recipe => {
            // destructure recipe
            const { tagList } = recipe

            // check if any recipe tags match any selected filters
            return tagList.some(tag => filters.includes(tag.toLowerCase()))
        })

        // update state
        setFilteredRecipes(filteredRecipes)
    }, [filters, searchableRecipes[sortMethod]])

    // get recipes when date range option changes
    useEffect(() => {
        // skip initial render
        if (didMount) {
            // reset: true
            // limit: 25
            // skip: 0
            // sortMethod: 'trendingRecipes'
            // days: dateRange
            getRecipes(true, 25, 0, 'trendingRecipes', dateRange)

            // reset: true
            // limit: 25
            // skip: 0
            // sortMethod: 'topRecipes'
            // days: dateRange
            getRecipes(true, 25, 0, 'topRecipes', dateRange)

            // reset: true
            // limit: 25
            // skip: 0
            // sortMethod: 'mostLovedRecipes'
            // days: dateRange
            getRecipes(true, 25, 0, 'mostLovedRecipes', dateRange)
        }
    }, [dateRange])

    // add scroll event listener to window when component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        // remove scroll event listener to window when component unmounts
        return () => window.removeEventListener('scroll', handleScroll)
    }, [recipesCount, searchableRecipes[sortMethod]])

    // count recipes when component mounts
    useEffect(() => countRecipes(), [])

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

    return (
        <div className="container" id="get-recipes">
            <RecipeBanner isAuthenticated={isAuthenticated} />
            <div className="row">
                <div className="col s12 l6">
                    <div className="row">
                        <div className="col s12">
                            Sort recipes
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 recipe-sort-methods">
                            <button
                                className={`btn-flat ${sortMethod === 'trendingRecipes' ? 'active' : null}`}
                                name='trendingRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons left">trending_up</i>trending
                            </button>
                            <button
                                className={`btn-flat ${sortMethod === 'topRecipes' ? 'active' : null}`}
                                name='topRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons left">thumb_up</i>top
                            </button>
                            <button
                                className={`btn-flat ${sortMethod === 'mostLovedRecipes' ? 'active' : null}`}
                                name='mostLovedRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons left">favorite</i>loved
                            </button>
                            <button
                                className={`btn-flat ${sortMethod === 'newRecipes' ? 'active' : null}`}
                                name='newRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons left">new_releases</i>new
                            </button>
                        </div>
                        {sortMethod !== 'newRecipes' ? <DateRanges initState={dateRange} liftState={setDateRange} /> : null}
                    </div>
                </div>
                <div className="col s12 l6">
                    <div className="row">
                        <div className="col s12">
                            Filter recipes
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 l6 recipe-tag-search">
                            <Autocomplete
                                options={options}
                                liftState={addFilter}
                            />
                        </div>
                        <div className="col s12 l6 recipe-tag-list">
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
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <span className="sm-text">
                        {filteredRecipes.length ? `${filteredRecipes.length} recipes found` : <IndeterminateMessage message="Searching for recipes" />}
                    </span>
                </div>
            </div>
            <RecipeCardList
                isAuthenticated={isAuthenticated}
                recipes={filteredRecipes}
                updateRecipe={updateRecipe}
                user={user}
            />
            <div className="row center-align">
                <div className="col s12">
                    <button
                        className="btn-small amber lighten-2 black-text"
                        disabled={fetchLimit}
                        onClick={appendRecipes}
                    >
                        View more recipes
                    </button>
                </div>
            </div>
        </div>
    )
}

GetRecipes.propTypes = {
    auth: PropTypes.object,
    countRecipes: PropTypes.func,
    errors: PropTypes.object,
    getRecipes: PropTypes.func,
    recipes: PropTypes.object,
    // tags: PropTypes.array,
    updateRecipe: PropTypes.func
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes,
    // tags: state.tags
})

export default connect(
    mapStateToProps,
    { countRecipes, getRecipes, updateRecipe }
)(GetRecipes)
