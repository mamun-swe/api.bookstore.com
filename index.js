

const express = require("express")
const helmet = require("helmet")
const nocache = require("nocache")
const mongoose = require("mongoose")
const compression = require("compression")
const cluster = require("cluster")
const process = require("process")
const { cpus } = require("os")
const { buildSchema } = require("graphql")
const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { typeDefs } = require("./src/typeDefs")
const { resolvers } = require("./src/resolvers")

require("dotenv").config()

const main = async () => {
    const DB_URL = process.env.DB_URL
    const PORT = process.env.APP_PORT

    const app = express()
    app.use(compression())
    app.use(nocache())
    app.use(helmet())

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


    app.listen(PORT || 4000, () => {
        console.log(`App running on ${PORT} port`)
    })
}

main()