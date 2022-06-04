const productMutations = require("./product/product.mutation")
const transactionMutations = require("./transaction/transaction.mutation")

module.exports = {
    ...productMutations,
    ...transactionMutations
}