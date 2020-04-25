// import mongoose
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    summary: {
        type: [{ type: mongoose.Schema.Types.Mixed, ref: 'summary' }]
    },
    phoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


// create a user instance of the User model 
const User = mongoose.model('User', UserSchema);

// export the model 
module.exports = User;