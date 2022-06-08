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
        ...subscriptions
    }
};

module.exports = { resolvers }
