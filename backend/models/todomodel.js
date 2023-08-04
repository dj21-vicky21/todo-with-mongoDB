const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        required: false
    }
});

module.exports = mongoose.model('ToDo', todoSchema);