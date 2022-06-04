

const express = require("express")
const mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { typeDefs } = require("./src/schema")
const { resolvers } = require("./src/resolvers")

require("dotenv").config()

const main = async () => {
    const DB_URL = process.env.DB_URL
    const PORT = process.env.APP_PORT || 5001
    const host = '0.0.0.0'

    const app = express()

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        formatError: (err) => {
            return ({
                message: err.originalError?.message || err.message,
                code: err.originalError?.code || 400
            })
        }
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app })

    app.get('/', (req, res) => {
        res.json("WOW! Apollo server running. 😛😛😛")
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


    app.listen(PORT, host, () => {
        console.log(`App running.`)
    })
}

main()