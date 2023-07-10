const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'File'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: String,
});

module.exports = mongoose.model('Comment', CommentSchema);
