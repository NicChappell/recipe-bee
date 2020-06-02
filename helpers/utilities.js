const fileExtension = (file) => {
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

const fileSize = (file, megabyteLimit) => {
    // destructure file object
    const { size } = file

    // convert file size to megabytes
    const megabytes = Math.round(size / 1000000)

    // validate file size
    // true === file size too large
    // false === file size within limit
    return megabytes > megabyteLimit ? true : false
}

const slugify = (str = '') => {
    // split string on empty space ' ' separator
    // join array using hyphen '-' separator
    // convert string to lowercase
    return str.split(' ').join('-').toLowerCase()
}

module.exports = {
    fileExtension,
    fileSize,
    slugify
}