import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'

export const useCheckboxValue = (val = false) => {
    const [checked, setChecked] = useState(val)

    return {
        onChange: e => setChecked(!checked),
        type: 'checkbox',
        checked: checked
    }
}

export const useEmailValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: e => setValue(e.target.value),
        type: 'email',
        value
    }
}

export const useNumberValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: e => setValue(e.target.value),
        type: 'number',
        value
    }
}

export const usePasswordValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: e => setValue(e.target.value),
        type: 'password',
        value
    }
}

export const useSelectValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        className: 'browser-default',
        onChange: e => setValue(e.target.value),
        value
    }
}

export const useTextValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: e => setValue(e.target.value),
        type: 'text',
        value
    }
}

export const useTextAreaValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        className: 'materialize-textarea',
        onChange: e => setValue(e.target.value),
        value
    }
}

export const useValidNumberValue = (val = 0) => {
    const [blurred, setBlurred] = useState(false)
    const [value, setValue] = useState(val)
    const [valid, setValid] = useState(true)

    const handleBlur = e => {
        setBlurred(true)
        value ? setValue(e.target.value) : setValue(0)
    }

    const handleChange = e => setValue(e.target.value)

    const handleFocus = e => value ? setValue(e.target.value) : setValue('')

    useEffect(() => {
        if (value > 0 && blurred === true) {
            // valid and blurred
            setValid(true)
        } else if (value > 0 && blurred === false) {
            // valid and unblurred
            setValid(true)
        } else if (value < 1 && blurred === true) {
            // invalid and blurred
            setValid(false)
        } else if (value < 1 && blurred === false) {
            // invalid and unblurred
            setValid(true)
        }
    }, [blurred, value])

    return {
        onBlur: handleBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        type: 'number',
        valid,
        value
    }
}

export const useValidSelectValue = (val = '') => {
    const [valid, setValid] = useState(1)
    const [value, setValue] = useState(val)

    const handleChange = e => {
        setValue(e.target.value)
        e.target.value ? setValid(1) : setValid(0)
    }

    return {
        className: 'browser-default',
        onChange: handleChange,
        valid,
        value
    }
}

export const useValidTextAreaValue = (val = '', errorMessage = '') => {
    const [valid, setValid] = useState(1)
    const [value, setValue] = useState(val)

    const handleBlur = e => e.target.value ? setValid(1) : setValid(0)

    const handleChange = e => {
        setValue(e.target.value)
        e.target.value ? setValid(1) : setValid(0)
    }

    const handleFocus = () => setValid(1)

    useEffect(() => {
        setValid(errorMessage ? 0 : 1)
    }, [errorMessage])

    return {
        className: 'materialize-textarea',
        onBlur: handleBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        valid,
        value
    }
}

export const useValidTextValue = (val = '', errorMessage = '') => {
    const [valid, setValid] = useState(1)
    const [value, setValue] = useState(val)

    const handleBlur = e => e.target.value ? setValid(1) : setValid(0)

    const handleChange = e => {
        setValue(e.target.value)
        e.target.value ? setValid(1) : setValid(0)
    }

    const handleFocus = () => setValid(1)

    useEffect(() => {
        setValid(errorMessage ? 0 : 1)
    }, [errorMessage])

    return {
        autoComplete: "off",
        onBlur: handleBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        type: 'text',
        valid,
        value
    }
}

// get the size and relative position of an element
export const useClientRect = () => {
    const [rect, setRect] = useState(null)

    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect())
        }
    }, [])

    return [rect, ref]
}

// get the window width and height
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0])

    useEffect(() => {
        // define function to update size
        const updateSize = () => setSize([window.innerWidth, window.innerHeight])

        // update size on window resize
        window.addEventListener('resize', updateSize)

        // initialize size
        updateSize()

        // clean up after this effect
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return size
}

// prevent effect on first render
export const useDidMount = () => {
    const didMountRef = useRef(false)

    useEffect(() => {
        didMountRef.current = true
    }, [])

    return didMountRef.current
}
