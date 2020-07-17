// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'

// import actions
import {
    changeHeart,
    changeVote,
    countRecipes,
    getRecipes
} from '../actions/recipeActions'

// import components
import Autocomplete from '../components/utility/Autocomplete'
import IndeterminateMessage from '../components/utility/IndeterminateMessage'
import RecipeCardList from '../components/recipe/RecipeCardList'
import DateRanges from '../components/utility/DateRanges'

// import custom hooks
import { useDidMount } from '../helpers/customHooks'

// import helper functions
import {
    calculateFetchLimit,
    filterFilters,
    filterRecipes,
    generateOptions
} from '../helpers/recipes'

const Banner = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return (
            <div className="row banner">
                <div className="col s12 content">
                    <p>Add your favorite recipes and share them with the RecipeBee community</p>
                    <Link to="/recipes/create" className="btn btn-flat amber lighten-2 black-text">Create Recipe</Link>
                </div>
            </div>
        )
    }
    return (
        <div className="row banner">
            <div className="col s12">
                <div className="background">
                    <div className="content">
                        <p>RecipeBee makes it easy to save your favorite recipes and discover new ideas</p>
                        <Link to="/sign-up" className="btn btn-flat amber lighten-2 black-text">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

Banner.propTypes = { isAuthenticated: PropTypes.bool }

const Button = props => {
    // destructure props
    const {
        fetchLimit,
        handleClick
    } = props

    if (!fetchLimit) {
        return (
            <div className="row center-align">
                <div className="col s12">
                    <button
                        className="black-text btn-small btn-flat amber lighten-2"
                        onClick={handleClick}
                    >
                        View More Recipes
                    </button>
                </div>
            </div>
        )
    }
    return null
}

Button.propTypes = {
    fetchLimit: PropTypes.bool,
    handleClick: PropTypes.func
}

const GetRecipes = props => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        errors,
        countRecipes,
        getRecipes,
        recipes,
    } = props

    // state hook variables
    const [bottom, setBottom] = useState(false)
    const [dateRange, setDateRange] = useState('30')
    const [fetchLimit, setFetchLimit] = useState(true)
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
        recipeCounts,
        searchableRecipes
    } = recipes

    const addFilter = filter => {
        setFilters([...filters, filter])

        const updatedOptions = options.filter(option => option !== filter)
        setOptions(updatedOptions)
    }

    const appendRecipes = () => {
        // reset: false
        // limit: 25
        // skip: searchableRecipes[sortMethod].length
        // sortMethod: sortMethod
        // days: dateRange
        getRecipes(false, 25, searchableRecipes[sortMethod].length, sortMethod, dateRange)
    }

    const handleSortMethodClick = e => setSortMethod(e.currentTarget.name)

    const handleClick = () => appendRecipes()

    const handleScroll = () => {
        // calculate scroll bottom status
        const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight

        // update state
        setBottom(atBottom)
    }

    const removeFilter = filter => {
        const updatedFilters = filters.filter(filterName => filterName !== filter)
        setFilters(updatedFilters)

        setOptions([...options, filter])
    }

    // update state when bottom changes
    useEffect(() => {
        // get recipes already fetched
        const recipeArray = searchableRecipes[sortMethod]
        // get count of available recipes
        const recipeCount = recipeCounts[sortMethod]
        calculateFetchLimit(recipeArray, recipeCount)
            ? setFetchLimit(true)
            : appendRecipes()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bottom])

    // fetch recipe data and update state when date range changes
    useEffect(() => {
        // skip initial render
        if (didMount) {
            // reset: true
            // limit: 25
            // skip: 0
            // sortMethod: 'trendingRecipes'
            // days: dateRange
            getRecipes(true, 25, 0, 'trendingRecipes', dateRange)
            countRecipes('mostLovedRecipes', dateRange)

            // reset: true
            // limit: 25
            // skip: 0
            // sortMethod: 'topRecipes'
            // days: dateRange
            getRecipes(true, 25, 0, 'topRecipes', dateRange)
            countRecipes('topRecipes', dateRange)

            // reset: true
            // limit: 25
            // skip: 0
            // sortMethod: 'mostLovedRecipes'
            // days: dateRange
            getRecipes(true, 25, 0, 'mostLovedRecipes', dateRange)
            countRecipes('trendingRecipes', dateRange)

            // // set fetch limit to false
            // setFetchLimit(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRange])

    // update state when filters changes
    useEffect(() => {
        // filter recipes
        const filteredRecipes = filterRecipes(searchableRecipes[sortMethod], filters)

        // update state
        setFilteredRecipes(filteredRecipes)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    // update state when recipe data updates
    useEffect(() => {
        // set bottom to false
        setBottom(false)

        // get recipes already fetched
        const recipeArray = searchableRecipes[sortMethod]
        // get count of available recipes
        const recipeCount = recipeCounts[sortMethod]
        calculateFetchLimit(recipeArray, recipeCount)
            ? setFetchLimit(true)
            : setFetchLimit(false)

        // generate filter options
        const newOptions = generateOptions(searchableRecipes[sortMethod])
        setOptions(newOptions)

        // remove irrelevant filters
        const newFilters = filterFilters(filters, newOptions)
        setFilters(newFilters)

        // filter recipes array
        const filteredRecipes = filterRecipes(searchableRecipes[sortMethod], filters)
        setFilteredRecipes(filteredRecipes)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchableRecipes])

    // update state when sort method changes
    useEffect(() => {
        // get recipes already fetched
        const recipeArray = searchableRecipes[sortMethod]
        // get count of available recipes
        const recipeCount = recipeCounts[sortMethod]
        calculateFetchLimit(recipeArray, recipeCount)
            ? setFetchLimit(true)
            : setFetchLimit(false)

        // generate filter options
        const newOptions = generateOptions(searchableRecipes[sortMethod])
        setOptions(newOptions)

        // remove irrelevant filters
        const newFilters = filterFilters(filters, newOptions)
        setFilters(newFilters)

        // filter recipes array
        const filteredRecipes = filterRecipes(searchableRecipes[sortMethod], newFilters)
        setFilteredRecipes(filteredRecipes)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortMethod])

    // add scroll event listener to window after component mounts
    useEffect(() => {
        if (didMount) window.addEventListener('scroll', handleScroll)

        // remove scroll event listener to window when component unmounts
        return () => window.removeEventListener('scroll', handleScroll)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [didMount])

    if (!isEmpty(errors)) {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="center-align col s12">
                        <p>There's been an error, please try again later</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container" id="get-recipes">
            <Banner isAuthenticated={isAuthenticated} />
            <div className="row">
                <div className="col s12 l6">
                    <div className="row">
                        <div className="col s12">
                            Sort recipes
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 sort-methods">
                            <div className="button-group">
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
                            </div>
                            <div className="button-group">
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
                        </div>
                        <div className="col s12">
                            {sortMethod !== 'newRecipes' ? <DateRanges context={'Previous'} initState={dateRange} liftState={setDateRange} /> : null}
                        </div>
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
                                    <div className="chip amber lighten-2" key={filter}>
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
                changeHeart={changeHeart}
                changeVote={changeVote}
                isAuthenticated={isAuthenticated}
                recipes={filteredRecipes}
                user={user}
            />
            <Button
                fetchLimit={fetchLimit}
                handleClick={handleClick}
            />
        </div>
    )
}

GetRecipes.propTypes = {
    auth: PropTypes.object,
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    countRecipes: PropTypes.func,
    errors: PropTypes.object,
    getRecipes: PropTypes.func,
    recipes: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes,
    // tags: state.tags
})

const actionCreators = {
    changeHeart,
    changeVote,
    countRecipes,
    getRecipes
}

export default connect(mapStateToProps, actionCreators)(GetRecipes)
