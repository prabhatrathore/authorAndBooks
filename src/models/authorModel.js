const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    userName: { type: String, required: 'user name is required', trim: true },
    password: {
        type: String, required: 'password is required'
    }
}, { timestamps: true })
module.exports = mongoose.model('myauthor', authorSchema)
