const { isValidDecimal } = require("./utils")

describe('utils.js' , () => {
    it('Should return true if number is an integer' , () => {
        expect(isValidDecimal(42)).toBe(true)
    })

    it('Should return true if the number has one decimal place' , () => {
        expect(isValidDecimal(6.2)).toBe(true)
    })

    it('Should return true if the number has two decimal places' , () => {
        expect(isValidDecimal(3.14)).toBe(true)
    })

    it('Should return false for a number wit more than two decimal places' , () => {
        expect(isValidDecimal(1.414)).toBe(false)
        expect(isValidDecimal(51.2222222)).toBe(false)
    })
})