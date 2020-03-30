// import dependencies
import React, { useEffect, useState } from 'react'

// import components
import Autocomplete from '../utility/Autocomplete'

const CreateRecipeTags = props => {
    // state hook variables
    const [options, setOptions] = useState([])
    const [tagList, setTagList] = useState([])

    // destructure props
    const {
        liftState,
        tags
    } = props

    // set options when tags prop changes
    useEffect(() => {
        const options = tags.map(tagObj => tagObj.tag)
        setOptions(options)
    }, [tags])

    useEffect(() => {
        liftState(tagList)
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
        <div className="row">
            <div className="col s12 l6 search">
                <Autocomplete
                    options={options}
                    liftState={addTag}
                />
            </div>
            <div className="col s12 l6 tags">
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

export default CreateRecipeTags
