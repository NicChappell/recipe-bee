import { useState } from 'react'

export const useInputValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: (e) => setValue(e.target.value),
        type: 'text',
        value: value
    }
}

export const useSelectValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        className: 'browser-default',
        onChange: (e) => setValue(e.target.value),
        value: value
    }
}

export const useTextAreaValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        className: 'materialize-textarea',
        onChange: (e) => setValue(e.target.value),
        value: value
    }
}
