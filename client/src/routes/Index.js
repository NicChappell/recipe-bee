// import dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import actions
import {
    changeHeart,
    changeVote
} from '../actions/recipeActions'

// import components
import Recipes from '../components/index/Recipes'
import Testimonials from '../components/index/Testimonials'
import ValueProps from '../components/index/ValueProps'

const Index = (props) => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        recipes
    } = props

    return (
        <div className="container" id="index">
            <ValueProps auth={auth} />
            <hr className="mb-3 mt-5" />
            <Recipes
                auth={auth}
                changeHeart={changeHeart}
                changeVote={changeVote}
                recipes={recipes}
            />
            <hr className="mb-3 mt-5" />
            <Testimonials />
        </div>
    )
}

Index.propTypes = {
    auth: PropTypes.object,
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    recipes: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth,
    recipes: state.recipes
})

const actionCreators = {
    changeHeart,
    changeVote
}

export default connect(mapStateToProps, actionCreators)(Index)
