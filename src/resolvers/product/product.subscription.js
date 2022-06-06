


const newProduct = {
    productCreated: {
        resolve: (payload) => payload.productCreated,
        subscribe: () => pubsub.asyncIterator("NEW_PRODUCT")
    }
}

module.exports = {
    newProduct
}