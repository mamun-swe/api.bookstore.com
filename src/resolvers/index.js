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
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_PRODUCT")
        },
    }
};

module.exports = { resolvers }
