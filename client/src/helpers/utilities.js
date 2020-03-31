export const toTitleCase = str => {
    // convert input string and split into an array
    const arr = str.toLowerCase().split(' ')

    // isolate and capitalize the first letter of each string in the array
    // concatenate with the remaining letters of each string in the array
    const map = arr.map(el => el.charAt(0).toUpperCase() + el.slice(1))

    // convert array back into string
    return map.join(' ')
}
