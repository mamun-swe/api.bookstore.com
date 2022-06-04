
const Product = require("../../models/product.model")
const Transaction = require("../../models/transaction.model")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")

/* Create new resource */
const createTransaction = async (parent, args, context, info) => {
    const { inputData } = args
    const { product, quantity } = inputData

    await isMongooseId(product)

    /* Check product available */
    const isProductAvailable = await Product.findById(product)
    if (!isProductAvailable) {
        throw new Error("Product not found.")
    }

    const newTransaction = new Transaction({ product, quantity })
    let isCreated = await newTransaction.save()

    if (isCreated) {
        await Product.findByIdAndUpdate(
            product,
            { $push: { transactions: isCreated._id } }
        )
    }

    return isCreated
}

module.exports = {
    createTransaction
}