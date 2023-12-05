// Validates if a string is a properly formatted email address

function isValidEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
