const mongoose = require ('mongoose');

const ContactSchema = mongoose.Schema( { 
    user: {
        type: mongoose.Schema.Types.ObjectId, // ID that mongoose creates automatically
        ref: 'users' //referring to a specific collection
    },
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    type: {
        type: String, 
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }

});

module.exports = mongoose.model('contact', ContactSchema);