// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import ShoppingList from '../components/shopping/ShoppingList'

const GetShoppingList = (props) => {
    return (
        <ShoppingList />
    )
}

GetShoppingList.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(GetShoppingList)
