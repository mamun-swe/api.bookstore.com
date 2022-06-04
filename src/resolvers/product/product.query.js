
const Product = require("../../models/product.model")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")

/* List of resource */
const produtcs = async (parent, args, context, info) => {
    const { queryData = {} } = args
    const results = await Product.find(queryData)
        .populate("transactions")
        .sort({ _id: -1 })

    return results
}

/* Show specific resource */
const product = async (parent, args, context, info) => {
    const { queryData = {} } = args
    const { id } = queryData

    await isMongooseId(id)

    const result = await Product.findById(id)
        .populate("transactions")

    return result
}

module.exports = {
    produtcs,
    product
}