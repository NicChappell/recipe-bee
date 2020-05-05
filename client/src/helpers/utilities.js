export const fileExtension = (file) => {
    // destructure file object
    const { name } = file

    // array of valid extensions
    const validExtensions = ['jpg', 'jpeg', 'png']

    // get file extension
    const extension = name.split('.').pop().toLowerCase()

    // validate file extension
    // true === valid file extension
    // false === invalid file extension
    const validExtension = validExtensions.includes(extension)

    // return validExtension and extension
    return [validExtension, extension]
}

export const fileSize = (file, megabyteLimit) => {
    // destructure file object
    const { size } = file

    // convert file size to megabytes
    const megabytes = Math.round(size / 1000000)

    // validate file size
    // true === file size too large
    // false === file size within limit
    return megabytes > megabyteLimit ? true : false
}

export const formatTime = int => ("00" + int).slice(-2)

export const hyphenate = str => {
    // split string on empty space " " separator
    // join array using hyphen "-" separator
    // convert string to lowercase
    return str.split(" ").join("-").toLowerCase()
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
