// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'chef', 'admin'],
        default: 'user'
    },
    phoneNumber:String,
    verified: Boolean,
    isChef: Boolean,
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef' }, // Add chefId field
    imageUrl: String
    // Other fields as needed
});

module.exports = mongoose.model('User', userSchema);
