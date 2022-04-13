const Transaction = require("./Transaction")
const Wallet = require("./Wallet")

class App {
    constructor(username) {
        this.user = {
            name: username,
            wallets: [],
            money: 0
        }
    }

    addWallet(walletName) {
        this.user.wallets.push(new Wallet(walletName))
    }

    buy({ label, value, walletName }) {
        const transaction = new Transaction(label, -value)
        this.user.wallets.find(wallet => wallet.name === walletName).addTransaction(transaction)
        this.user.money -= value
    }

    receive({ label, value, walletName }) {
        const transaction = new Transaction(label, value)
        this.user.wallets.find(wallet => wallet.name === walletName).addTransaction(transaction)
        this.user.money += value
    }
}

module.exports = App