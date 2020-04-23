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

export default fileExtension