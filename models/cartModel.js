const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'At least one product is required.'
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });


// Joi Validation Schema
const cartValidationSchema = Joi.object({
    user: Joi.string().hex().length(24).required(), // ObjectId should be 24 characters long
    products: Joi.array().items(Joi.string().hex().length(24)).min(1).required(), // At least one product
    totalPrice: Joi.number().min(0).required() // Total price should be non-negative
});

module.exports = {
    cartModel:mongoose.model('cart',cartSchema),
    cartValidationSchema
};
