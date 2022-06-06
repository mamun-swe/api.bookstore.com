
const { PubSub } = require("graphql-subscriptions")
const Product = require("../../models/product.model")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")

const pubsub = new PubSub()

/* Store new resource */
const storeProduct = async (parent, args, context, info) => {
    const { inputData } = args
    const { name } = inputData

    // pubsub.publish('NEW_PRODUCT', { productCreated: args })


    const newProduct = new Product({ name })
    pubsub.publish('NEW_PRODUCT', { productCreated: newProduct })

    const result = await newProduct.save()
    // pubsub.publish('NEW_PRODUCT', { productCreated: newProduct });

    return result
}

/* Destroy specific resource */
const destroyProduct = async (parent, args, context, info) => {
    const { inputData = {} } = args
    const { id } = inputData

    await isMongooseId(id)

    const isDestroyed = await Product.findByIdAndDelete(id)
    if (isDestroyed) {
        return {
            status: true,
            message: "Product deleted."
        }
    }
}


module.exports = {
    storeProduct,
    destroyProduct
}