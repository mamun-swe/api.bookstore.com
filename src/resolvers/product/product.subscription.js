const { SUBCRIPTION_TYPES } = require("../../types")

const product = {
    productCreated: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(SUBCRIPTION_TYPES.NEW_PRODUCT)
    }
}

module.exports = {
    product
}