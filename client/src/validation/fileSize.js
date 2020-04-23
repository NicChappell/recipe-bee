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

export default fileSize
