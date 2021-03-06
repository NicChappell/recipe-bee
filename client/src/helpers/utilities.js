export const abbreviateNumber = num => {
    // billions
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B+'
    }
    // millions
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+'
    }
    // thousands
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K+'
    }
    return num
}

export const capitalize = str => {
    // get first character of the string
    // convert first character to uppercase
    // concatenate with remainder of string
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const fileExtension = (file = {}) => {
    // destructure file object
    const { name } = file

    let extension = undefined
    let validExtension = false

    if (name) {
        // array of valid extensions
        const validExtensions = ['jpg', 'jpeg', 'png']

        // get file extension
        extension = name.split('.').pop().toLowerCase()

        // validate file extension
        // true === valid file extension
        // false === invalid file extension
        validExtension = validExtensions.includes(extension)

        // return evaluated validExtension and extension values
        return [validExtension, extension]
    }

    // return default validExtension and extension values
    return [validExtension, extension]
}

export const fileSize = (file, megabyteLimit) => {
    // destructure file object
    const { size } = file

    if (size) {
        // convert file size to megabytes
        const megabytes = Math.round(size / 1000000)

        // validate file size
        // return true if file size too large
        // return false if file size within limit
        return megabytes > megabyteLimit ? true : false
    }

    // return false by default
    return false
}

export const formatTime = int => ('00' + int).slice(-2)

export const shuffleArray = arr => {
    let currIndex = arr.length
    let randIndex = undefined
    let tempValue = undefined

    // while elements remain to be shuffled
    while (0 !== currIndex) {
        // pick a remaining element
        randIndex = Math.floor(Math.random() * currIndex)

        // decrement current index
        currIndex -= 1

        // swap with the current element
        tempValue = arr[currIndex]
        arr[currIndex] = arr[randIndex]
        arr[randIndex] = tempValue
    }

    return arr
}

export const slugify = (str = '') => {
    // split string on empty space ' ' separator
    // join array using hyphen '-' separator
    // convert string to lowercase
    return str.split(' ').join('-').toLowerCase()
}

export const toTitleCase = str => {
    // convert input string and split into an array
    const arr = str.toLowerCase().split(' ')

    // isolate and uppercase the first letter of each string in the array
    // concatenate with the remaining letters of each string in the array
    const map = arr.map(el => el.charAt(0).toUpperCase() + el.slice(1))

    // convert array back into string
    return map.join(' ')
}
