// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import Autocomplete from '../utility/Autocomplete'

const RecipeTags = props => {
    // state hook variables
    const [options, setOptions] = useState([])
    const [tagList, setTagList] = useState([])

    // destructure props
    const {
        liftState,
        tags,
        valid,
        validate
    } = props

    // set options when tags prop changes
    useEffect(() => {
        const options = tags.map(tagObj => tagObj.tag)
        setOptions(options)
    }, [tags])

    // lift state when tagList changes
    useEffect(() => {
        liftState(tagList)
        validate(true)
    }, [tagList])

    // add tag
    const addTag = tag => {
        setTagList([...tagList, tag])

        const updatedOptions = options.filter(option => option !== tag)
        setOptions(updatedOptions)
    }

    // remove tag
    const removeTag = tag => {
        const updatedTagList = tagList.filter(tagName => tagName !== tag)
        setTagList(updatedTagList)

        setOptions([...options, tag])
    }

    return (
        <div className="row tags">
            <div className="col s12 l6 recipe-tag-search">
                <Autocomplete
                    options={options}
                    liftState={addTag}
                />
            </div>
            <div className="col s12 l6 recipe-tag-list">
                {tagList.map(tag => {
                    return (
                        <div className="chip orange lighten-2" key={tag}>
                            {tag.toUpperCase()}
                            <i className="close material-icons" onClick={() => removeTag(tag)}>close</i>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

RecipeTags.propTypes = {
    liftState: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    valid: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired
}

export default RecipeTags
