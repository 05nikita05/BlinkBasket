const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const orderSchema = mongoose.Schema({
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
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    status: {
        type: String,
        enum: ['pending','processing', 'shipped', 'delivered', 'canceled'],
        default: 'pending',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'delivery',
        required: false
    }
}, { timestamps: true });


// Joi Validation Schema
const validateOrder = Joi.object({
    user: Joi.string().hex().length(24).required(), // ObjectId should be 24 characters long
    products: Joi.array().items(Joi.string().hex().length(24)).min(1).required(), // At least one product
    totalPrice: Joi.number().min(0).required(), // Non-negative number
    address: Joi.string().min(10).max(255).required(), // Minimum 10 and maximum 255 characters
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'canceled').required(), // Valid statuses
    payment: Joi.string().hex().length(24).required(), // Payment ObjectId
    delivery: Joi.string().hex().length(24).optional() // Optional delivery ObjectId
});

module.exports = {
    orderModel : mongoose.model('Order', orderSchema),
    validateOrder
};
