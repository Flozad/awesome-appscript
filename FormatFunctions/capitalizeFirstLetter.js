// Capitalizes the first letter of each word in a string

function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
