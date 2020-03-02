import { useState } from 'react'

export const useCheckboxValue = (val = false) => {
    const [checked, setChecked] = useState(val)

    return {
        onChange: (e) => setChecked(!checked),
        type: 'checkbox',
        checked: checked
    }
}

export const useEmailValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: (e) => setValue(e.target.value),
        type: 'email',
        value: value
    }
}

export const usePasswordValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: (e) => setValue(e.target.value),
        type: 'password',
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

export const useTextValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: (e) => setValue(e.target.value),
        type: 'text',
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
