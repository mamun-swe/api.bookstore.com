
const { buildSchema } = require("graphql")

const transaction = buildSchema(`
    scalar Number
    scalar DateTime

    type Transaction {
        _id: String
        quantity: Number
        time: DateTime
    }

    input TransactionInput {
        product: String
        quantity: Number
    }

    type Mutation {
        createTransaction(inputData: TransactionInput):Transaction
    }
`)

module.exports = { transaction }