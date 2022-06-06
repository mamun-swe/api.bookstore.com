
const express = require("express")
const mongoose = require("mongoose")
const http = require('http')
const { PubSub } = require('graphql-subscriptions')
const { ApolloServer } = require("apollo-server-express")
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { execute, subscribe } = require('graphql')
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core")
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
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
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
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    })

    // const apolloServer = new ApolloServer({
    //     typeDefs,
    //     resolvers,
    //     plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    //     formatError: (err) => {
    //         return ({
    //             message: err.originalError?.message || err.message,
    //             code: err.originalError?.code || 400
    //         })
    //     },
    //     introspection: true
    // })

    // await apolloServer.start()
    // apolloServer.applyMiddleware({ app: app })



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


    // app.listen(PORT, () => {
    //     console.log(`App running on ${PORT}.`)
    // })
}

main()