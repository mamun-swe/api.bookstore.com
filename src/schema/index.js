
const { product } = require("./product.schema")
const { transaction } = require("./transaction.schema")

const typeDefs = [
    product,
    transaction
]

module.exports = { typeDefs }