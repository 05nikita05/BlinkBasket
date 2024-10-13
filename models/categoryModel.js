const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 100
    }
}, { timestamps: true });


// Joi Validation Schema
const validateCategory = Joi.object({
    name: Joi.string().min(3).max(100).required() // Minimum 3 and maximum 100 characters
});

module.exports = {
    categoryModel : mongoose.model('Category', categorySchema),
    validateCategory
};
