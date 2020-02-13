import { useState } from 'react'

export const useInputValue = (ph, v) => {
    const [value, setValue] = useState(v)

    return {
        onChange: (e) => setValue(e.target.value),
        placeholder: ph,
        type: 'text',
        value: value
    }
}
