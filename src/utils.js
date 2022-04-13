exports.isValidDecimal = (number) => {
    if (Number.isInteger(number)) return true
    if (number.toFixed(2) === `${number}0`) return true
    if (number.toFixed(2) === number.toString()) return true
    return false
}