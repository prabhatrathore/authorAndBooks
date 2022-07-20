const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({

    bookName: { type: String, required: 'bookName is required', trim: true },
    authorId: {
        type: ObjectId, required: true, ref: 'myAuthor'
    },
    authorName: {
        type: String, required: false,
    },
    price: { type: Number, required: true },

    updatedAt: { type: Date },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },

})
module.exports = mongoose.model('mybook', bookSchema)