const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const availabilitySchema = new Schema({

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: ['Available', 'Out of Stock'],
        default: 'Available'
    }

}, { timestamps: true });

module.exports = mongoose.model('Availability', availabilitySchema);