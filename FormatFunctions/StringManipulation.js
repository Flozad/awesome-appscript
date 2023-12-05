// Removes extra whitespace, tabs, and newlines from a string

function cleanString(str) {
    return str.replace(/\s+/g, ' ').trim();
}
