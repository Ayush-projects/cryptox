const ChainUtil = require('../chain-util');
const hash = require('crypto-js/sha256')

class Transaction {
    constructor()
    {
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }
    update(senderWallet, recipient, amount)
    {
        const senderOutput = this.outputs.find(output => output.address ===senderWallet.publicKey);
        if(amount> senderOutput.amount)
        {
            console.log('Insufficient Balance')
            return;
        }
        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({amount, address: recipient});
        Transaction.signTransaction(this, senderWallet);
    return this;
    }


    static newTransaction(senderWallet, recipient, amount)
    {
        const transaction = new this();
        if(amount>senderWallet.balance)
        {
            console.log(`Amount : ${amount} exceeds balance. `);
            return;
        }
        transaction.outputs.push(...[
            {amount: senderWallet.balance-amount, address: senderWallet.publicKey},
            {amount, address: recipient}
        ])
  
        Transaction.signTransaction(transaction, senderWallet);

        return transaction;

    }
    static signTransaction(transaction, senderWallet){
    transaction.input = {
        timestamp: Date.now(),
        amount: senderWallet.balance,
        address: senderWallet.publicKey,
        signature: senderWallet.sign(hash(JSON.stringify(transaction.outputs)).toString())
    }
   

}
static verifyTransaction(transaction)
{
    return ChainUtil.verifySignature(transaction.input.address, transaction.input.signature, hash(JSON.stringify(transaction.outputs)).toString());
    
}

}
module.exports = Transaction;