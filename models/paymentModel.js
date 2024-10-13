const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const paymentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    method: {
        type: String,
        // enum: ['credit_card', 'debit_card', 'UPI', 'net_banking', 'cash_on_delivery'],
        required: true
    },
    status: {
        type: String,
        // enum: ['pending', 'completed', 'failed', 'refunded'],
        required: true
    },
    transactionID: {
        type: String,
        required: true,
        unique: true,
        // minlength: 6
    }
}, { timestamps: true });


// Joi Validation Schema
const validatePayment = Joi.object({
    order: Joi.string().hex().length(24).required(), // ObjectId should be 24 hex characters long
    amount: Joi.number().min(0).required(), // Must be a non-negative number
    method: Joi.string().required(),
    status: Joi.string().required(),
    transactionID: Joi.string().required() // At least 6 characters long
});

module.exports = {
    paymentModel : mongoose.model('Payment', paymentSchema),
    validatePayment
};
