// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import ShoppingList from '../components/shopping/ShoppingList'

const GetShoppingList = (props) => {
    // destructure props
    const { utilities } = props

    // destructure utilities
    const { routerHeight } = utilities

    return (
        <div className="container router" style={{ height: routerHeight }}>
            <ShoppingList />
        </div>
    )
}

GetShoppingList.propTypes = {
    auth: PropTypes.object.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    utilities: state.utilities
})

export default connect(
    mapStateToProps
)(GetShoppingList)
