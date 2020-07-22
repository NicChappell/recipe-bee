// import dependencies
import isEmpty from 'lodash/isEmpty'

export const calculateFetchLimit = (array, count) => {
    // calculate number of records fetched
    let fetched = 0
    if (array) {
        fetched = array.length
    }

    // calculate fetch limit
    const fetchLimit = count < 500 ? count : 500

    if (fetched >= fetchLimit) {
        return true
    } else {
        return false
    }
}

export const filterFilters = (filters, options) => filters.filter(filter => options.includes(filter));

export const filterRecipes = (recipes, filters) => {
    if (isEmpty(filters)) {
        return recipes
    } else {
        return recipes.filter(recipe => {
            // destructure recipe
            const { tagList } = recipe

            // check if any recipe tags match any filters
            return tagList.some(tag => filters.includes(tag.toLowerCase()))
        })
    }
}

export const generateOptions = (recipes) => {
    const options = []

    recipes && recipes.forEach(recipe => {
        // destructure recipe
        const { tagList } = recipe

        // add tag to options array if absent
        tagList.forEach(tag => {
            if (options.indexOf(tag) === -1) {
                options.push(tag)
            }
        })
    })

    return options
}
