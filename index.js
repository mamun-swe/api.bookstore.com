
const express = require("express")
const http = require('http')
const mongoose = require("mongoose")
const { execute, subscribe } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const { ApolloServer } = require("apollo-server-express")
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { typeDefs } = require("./src/schema")
const { resolvers } = require("./src/resolvers")

require("dotenv").config()

const main = async () => {
    const DB_URL = process.env.DB_URL
    const PORT = process.env.PORT || 4001

    const app = express()
    const httpServer = http.createServer(app)
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const pubsub = new PubSub()

    app.get('/', (req, res) => {
        res.json("WOW! Apollo server running. 😛😛😛")
    })

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res, pubsub }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ httpServer }), {
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close()
                    }
                }
            }
        }]
    })

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        async onConnect(
            connectionParams,
            webSocket,
            context
        ) {
            console.log('Connected!');
            return {
                pubsub
            }
        },
        onDisconnect(webSocket, context) {
            console.log('Disconnected!')
        },
    }, {
        server: httpServer,
        path: server.graphqlPath,
    })

    await server.start()
    server.applyMiddleware({ app })

    httpServer.listen({ port: PORT }, () => {
        console.log(`🚀 graphQL server running at http://localhost:${PORT}${server.graphqlPath}`)
    })

    /* Create database connection */
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
    })
        .then(() => console.log("Database connected"))
        .catch(error => {
            if (error) console.log("Failed to connect database ")
        })
}

main()