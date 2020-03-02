// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const GetShoppingLists = (props) => {
    return (
        <div>Shoppting Lists</div>
    )
}

GetShoppingLists.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(GetShoppingLists)
