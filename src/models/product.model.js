const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: "Transaction",
        default: []
    }]
}, {
    timestamps: true
})
const product = model("Product", productSchema)

module.exports = product