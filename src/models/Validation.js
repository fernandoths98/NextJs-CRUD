
const mongoose = require('mongoose');
export const ValidationSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxlength: [25, 'First name must be less than 25 characters'],
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        maxlength: [25, 'Last name must be less than 25 characters'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
    },

    phone: {
        type: Number,
        required: [true, 'Phone is required'],
        maxlength: [13, 'Phone must be less than 13 characters'],
    },

    address: {
        type: String,
        required: [true, 'Address is required'],
        maxlength: [50, 'Address must be less than 50 characters'],
    },
})

module.exports = mongoose.models.Validation || mongoose.model("Validation", ValidationSchema);
