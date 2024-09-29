const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
        // minlength: 8
    },
    role: {
        type: String,
        enum: ['Admin', 'SuperAdmin'],
        default: 'Admin',
        required: true
    }
}, { timestamps: true });


// Joi Validation Schema
const adminValidationSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('Admin', 'SuperAdmin').required()
});

module.exports = {
    adminModel : mongoose.model('Admin', adminSchema),
    adminValidationSchema
};
