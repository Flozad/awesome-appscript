// Formats a number to a specified decimal place and adds thousand separators

function formatNumber(number, decimalPlaces) {
    return number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}