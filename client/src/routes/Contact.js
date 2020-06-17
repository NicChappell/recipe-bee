// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import ContactForm from '../components/contact/ContactForm'

const Contact = ({ errors }) => {
    return (
        <div className="container" id="contact">
            <div className="row center-align">
                <div className="col s12">
                    <ContactForm errors={errors} />
                </div>
            </div>
        </div>
    )
}

Contact.propTypes = { errors: PropTypes.object }

const mapStateToProps = state => ({ errors: state.errors })

export default connect(mapStateToProps)(Contact)
