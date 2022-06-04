
const { buildSchema } = require("graphql")

const product = buildSchema(`
    scalar Number
    scalar DateTime

    type ProductTransaction {
        _id: String
        product: String
        quantity: Number
        time: Number
    }

    type Product {
        _id: String
        name: String
        transactions: [ProductTransaction]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type DeleteResponse {
        status: Boolean
        message: String
    }

    input InsertProduct {
        name: String
    }

    input ShowProduct {
        id: String
    }

    input DestroyProduct {
        id: String
    }

    input GetProductsQuerySchema {
        id: String
        name: String
    }
    
    type Query {
        produtcs(queryData: GetProductsQuerySchema):[Product]
        product(queryData: ShowProduct): Product
    } 

    type Mutation {
        storeProduct(inputData: InsertProduct):Product
        destroyProduct(inputData: DestroyProduct):DeleteResponse
    }
`)

module.exports = { product }