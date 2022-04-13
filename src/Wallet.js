class Wallet {
    constructor(name = "New Wallet") {
        this.name = name
        this.balance = 0
        this.transactions = []
    }

    getBalance() {
        return this.balance / 100
    }

    addTransaction(transaction) {
        this.transactions.push(transaction)
        this.balance += transaction.value
    }

    getAllIncomes(startDate = new Date(0), endDate = new Date()) {
        const list = this.transactions.filter(transaction => transaction.value > 0 && transaction.createdAt >= startDate && transaction.createdAt <= endDate)
        const total = list.reduce((sum, income) => sum + income.getValue(), 0)
        return { total, list }
    }

    getAllExpenses(startDate = new Date(0), endDate = new Date()) {
        const list = this.transactions.filter(transaction => transaction.value < 0 && transaction.createdAt >= startDate && transaction.createdAt <= endDate)
        const total = -1 * list.reduce((sum, income) => sum + income.getValue(), 0)
        return { total, list }
    }
}

module.exports = Wallet