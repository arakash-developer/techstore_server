const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://arakashdeveloper:LlmmKsEH1MNpF2R8@akash.f7phc.mongodb.net/techstore")

const ProductSchema = mongoose.Schema({
        title: {
            type: String,
            required: {
                message: "Title is required"    
            },
        },
        description: String,
        category: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        tags: [String],
        brand: String,
        sku: String,
        weight: Number,
        dimensions: {
            width: Number,
            height: Number,
            depth: Number
        },
        warrantyInformation: String,
        shippingInformation: String,
        availabilityStatus: String,
        reviews: [
            {
                rating: Number,
                comment: String,
                date: Date,
                reviewerName: String,
                reviewerEmail: String
            }   
        ],
        returnPolicy: String,
        minimumOrderQuantity: Number,
        meta: {
            createdAt: Date,
            updatedAt: Date,
            barcode: String,
            qrCode: String
        },
        images: [String],
        thumbnail: String
    });

module.exports = mongoose.model('Product', ProductSchema);













