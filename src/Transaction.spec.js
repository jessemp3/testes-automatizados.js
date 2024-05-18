const Transaction = require("./Transaction")

describe('Transaction class' , () => {
    it('Should not be able to create a transaction with a non string label' , () => {
        expect(() => new Transaction(1, 42)).toThrow('label must be of type string')
    })

    it('Should not be able to create a transaction with a non string label' , () => {
        expect(() => new Transaction("Some test tranction", 'yes')).toThrow('value must be of type number')
    })

    it('Should not be able to create a transaction with more than two decimal places' , () => {
        expect(() => new Transaction('Some teste transaction' , 1.123)).toThrow('value must have up to two decimal places')
        expect(() => new Transaction('Some teste transaction' , 1.12)).not.toThrow('Its ok')
    })

    it('Should save the valur as an integer' , () => {
        const transaction = new Transaction('some test trasaction' , 1.12)

        expect(transaction.value).toBe(112)
    })

    it('Should be able to get the value as a float' , () => {
        const transaction = new Transaction('some test transaction' , 1.12)

        expect(transaction.getValue()).toBe(1.12)
    })
})