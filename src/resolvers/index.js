const queries = require("./queries")
const mutations = require("./mutations")
const resolvers = {
    Mutation: {
        ...mutations
    },
    Query: {
        ...queries
    }
};

module.exports = { resolvers }
