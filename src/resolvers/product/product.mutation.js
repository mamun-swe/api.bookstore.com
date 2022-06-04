
const Product = require("../../models/product.model")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")

/* Store new resource */
const storeProduct = async (parent, args, context, info) => {
    const { inputData } = args
    const { name } = inputData

    const newProduct = new Product({ name })
    const result = await newProduct.save()

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