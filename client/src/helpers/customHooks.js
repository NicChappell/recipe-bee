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
        value: value
    }
}

export const usePasswordValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: e => setValue(e.target.value),
        type: 'password',
        value: value
    }
}

export const useSelectValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        className: 'browser-default',
        onChange: e => setValue(e.target.value),
        value: value
    }
}

export const useTextValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        onChange: e => setValue(e.target.value),
        type: 'text',
        value: value
    }
}

export const useTextAreaValue = (val = '') => {
    const [value, setValue] = useState(val)

    return {
        className: 'materialize-textarea',
        onChange: e => setValue(e.target.value),
        value: value
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
