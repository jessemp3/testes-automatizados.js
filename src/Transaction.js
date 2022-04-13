const { isValidDecimal } = require("./utils")

class Transaction {
    constructor(label, value) {
        if (typeof label !== 'string') throw new Error('label must be of type string')
        if (typeof value !== 'number') throw new Error('value must be of type number')
        if (!isValidDecimal(value)) throw new Error('value must have up to two decimal places')

        this.label = label
        this.value = Math.round(value * 100)
        this.createdAt = new Date()
    }

    getValue() {
        return this.value / 100
    }
}

module.exports = Transaction