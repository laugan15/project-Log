const { Schema, model } = require("mongoose");

const eshopSchema = new Schema({

    img:
    {
        data: Buffer,
        contentType: String
    },
    name: { type: String },
    brand: { type: String },
    price: { type: Number},
    createAt: { type: Date, default: Date.now, immutable: true },});


   module.exports = model("Product", eshopSchema);