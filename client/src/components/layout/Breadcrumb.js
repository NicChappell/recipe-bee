// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

// import helper functions
import { toTitleCase } from '../../helpers/utilities'

const Breadcrumb = ({ location }) => {
    // destructure location
    const { pathname } = location

    // split pathname into an array
    const path = pathname.split('/')

    // remove last element of the array
    path.pop()

    // create variable to generate routes
    let route = ''

    // generate breadcrumbs
    const breadcrumbs = path.map((el, i) => {
        // first breadcrumb
        if (i === 0) {
            return (
                <Link className="breadcrumb" key={i} to="/">Home</Link>
            )
        }

        // update route
        route = `${route}/${el}`

        // return new breadcrumb
        return (
            <Link className="breadcrumb" key={i} to={route}>{toTitleCase(el)}</Link>
        )
    })

    return (
        <div className="row hide-on-small-only">
            <div className="col s12">
                <div className="breadcrumbs">
                    {breadcrumbs}
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb
