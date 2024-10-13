const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const addressSchema = mongoose.Schema({
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    zip: {
        type: Number,
        required: true,
        min: 10000,
        max: 99999
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

const userSchema = mongoose.Schema({
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
        minlength: 8
    },
    phone: {
        type: String, // Changed to String to handle leading zeros if any
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    addresses: {
        type: [addressSchema],
        required: true,
        validate: {
            validator: function(v) {
                if (this.isOAuth) return true; // If OAuth, addresses can be empty
                return v.length >= 0;
            },
            message: 'At least one address is required.'
        }
    }
}, {timestamps: true});

// const User = mongoose.model('User', userSchema);

// Joi Validation Schema
const addressValidationSchema = Joi.object({
    state: Joi.string().min(2).max(100).required(),
    zip: Joi.number().integer().min(10000).max(99999).required(),
    city: Joi.string().min(2).max(100).required(),
    address: Joi.string().min(5).max(255).required()
});

const validateUser = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    addresses: Joi.array().items(addressValidationSchema).required()
});

module.exports = {
    userModel : mongoose.model('User', userSchema),
    validateUser
};
