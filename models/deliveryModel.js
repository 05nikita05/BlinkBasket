const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const deliverySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    deliveryBoy: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'in-transit', 'delivered', 'canceled'],
        default: 'pending',
        required: true
    },
    trackingURL: {
        type: String,
        required: false,
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });


// Joi Validation Schema
const deliveryValidationSchema = Joi.object({
    order: Joi.string().hex().length(24).required(), // ObjectId should be 24 characters long
    deliveryBoy: Joi.string().min(3).max(100).required(),
    status: Joi.string().valid('pending', 'in-transit', 'delivered', 'canceled').required(),
    trackingURL: Joi.string().uri().optional(), // URL format validation
    estimatedDeliveryTime: Joi.number().min(0).required() // Non-negative number
});

module.exports = {
    deliveryModel : mongoose.model('Delivery', deliverySchema),
    deliveryValidationSchema
};
