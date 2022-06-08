
const Product = require("../../models/product.model")
const { SUBCRIPTION_TYPES } = require("../../types")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")

/* Store new resource */
const storeProduct = async (_, { inputData }, { pubsub }) => {
    const { name } = inputData

    const newProduct = new Product({ name })
    const result = await newProduct.save()

    pubsub.publish(SUBCRIPTION_TYPES.NEW_PRODUCT, { productCreated: newProduct })

    return result
}

/* Destroy specific resource */
const destroyProduct = async (_, { inputData }, { pubsub }) => {
    const { id } = inputData

    await isMongooseId(id)

    const destroyedProduct = await Product.findByIdAndDelete(id)

    if (!destroyedProduct) {
        return {
            status: false,
            message: "Product not available."
        }
    }

    pubsub.publish(
        SUBCRIPTION_TYPES.NEW_PRODUCT,
        {
            productCreated: destroyedProduct
        }
    )

    return {
        status: true,
        message: "Product deleted."
    }
}

module.exports = {
    storeProduct,
    destroyProduct
}