const queries = require("./queries")
const mutations = require("./mutations")
const subscriptions = require("./subscriptions")
const resolvers = {
    Mutation: {
        ...mutations
    },
    Query: {
        ...queries
    },
    Subscription: {
        // ...subscriptions
        productCreated: {
            resolve: (payload) => payload.productCreated,
            subscribe: () => pubsub.asyncIterator("NEW_PRODUCT")
        },
    }
};

module.exports = { resolvers }
