// import dependencies
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import {
    changeHeart,
    changeVote,
    countRecipes,
    getRecipes
} from '../actions/recipeActions'

// import components
import Banner from '../components/get-recipes/Banner'
import Button from '../components/get-recipes/Button'
import RecipeCardList from '../components/recipe/RecipeCardList'
import Autocomplete from '../components/utility/Autocomplete'
import IndeterminateMessage from '../components/utility/IndeterminateMessage'
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

const GetRecipes = props => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
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
        let offset = 0
        if (searchableRecipes[sortMethod]) {
            offset = searchableRecipes[sortMethod].length
        }

        // reset: false
        // limit: 25
        // skip: offset
        // sortMethod: sortMethod
        // days: dateRange
        getRecipes(false, 25, offset, sortMethod, dateRange)
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

    return (
        <div className="container" id="get-recipes">
            <Banner isAuthenticated={isAuthenticated} />
            <div className="row sort-and-filter">
                <div className="col s12 l6">
                    <div className="row sort-methods">
                        <div className="col s12">
                            <h6>Sort recipes</h6>
                        </div>
                        <div className="col s12 button-group">
                            <button
                                className={`btn-flat ${sortMethod === 'trendingRecipes' ? 'active' : null}`}
                                name='trendingRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons">trending_up</i>
                                Trending
                            </button>
                            <button
                                className={`btn-flat ${sortMethod === 'topRecipes' ? 'active' : null}`}
                                name='topRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons">thumb_up</i>
                                Top
                            </button>
                            <button
                                className={`btn-flat ${sortMethod === 'mostLovedRecipes' ? 'active' : null}`}
                                name='mostLovedRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons">favorite</i>
                                Loved
                            </button>
                            <button
                                className={`btn-flat ${sortMethod === 'newRecipes' ? 'active' : null}`}
                                name='newRecipes'
                                onClick={handleSortMethodClick}
                            >
                                <i className="material-icons left">new_releases</i>
                                New
                            </button>
                        </div>
                        <div className="col s12">
                            {
                                sortMethod !== 'newRecipes'
                                    ? <DateRanges
                                        context={'Previous'}
                                        initState={dateRange}
                                        liftState={setDateRange}
                                    />
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className="col s12 l6">
                    <div className="row filter-options">
                        <div className="col s12">
                            <h6>Filter recipes</h6>
                        </div>
                        <div className="col s12 m6 tag-search">
                            <Autocomplete
                                options={options}
                                liftState={addFilter}
                            />
                        </div>
                        <div className="col s12 m6 tag-list">
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
            <div className="row count">
                <div className="col s12">
                    {
                        filteredRecipes && filteredRecipes.length
                            ? <div className="found">{filteredRecipes.length} recipes found</div>
                            : <IndeterminateMessage message="Searching for recipes" />
                    }
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
    getRecipes: PropTypes.func,
    recipes: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
    recipes: state.recipes
})

const actionCreators = {
    changeHeart,
    changeVote,
    countRecipes,
    getRecipes
}

export default connect(mapStateToProps, actionCreators)(GetRecipes)
