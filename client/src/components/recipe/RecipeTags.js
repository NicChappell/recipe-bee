// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'

// import components
import Autocomplete from '../utility/Autocomplete'

const RecipeTags = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors,
        tags
    } = props

    // state hook variables
    const [options, setOptions] = useState([])
    const [tagList, setTagList] = useState([])
    const [valid, setValid] = useState(true)

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

    const handleBlur = () => isEmpty(tagList) ? setValid(false) : setValid(true)

    // set options when tags value changes
    useEffect(() => {
        const options = tags.map(tagObj => tagObj.tag)
        setOptions(options)
    }, [tags])

    // update state when tag list changes
    useEffect(() => {
        setValid(true)
        liftState(tagList)
        resolveErrors('tagList')
    }, [tagList])

    // update state when errors value changes
    useEffect(() => {
        errors.tagList
            ? setValid(false)
            : setValid(true)
    }, [errors.tagList])

    return (
        <div className="row tags">
            <div className="col s12 m6 recipe-tag-search">
                <Autocomplete
                    handleBlur={handleBlur}
                    liftState={addTag}
                    options={options}
                />
                {valid ? null : <span className="error-message">{errors.tagList}</span>}
            </div>
            <div className="col s12 m6 recipe-tag-list">
                {tagList.map(tag => {
                    return (
                        <div className="chip amber lighten-2" key={tag}>
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
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    tags: PropTypes.array
}

export default RecipeTags
