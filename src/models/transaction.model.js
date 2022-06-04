const { Schema, model } = require("mongoose")

const transactionSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    },
    time: {
        type: Number,
        default: new Date().getTime()
    }
}, {
    timestamps: true
})
const transaction = model("Transaction", transactionSchema)

module.exports = transaction