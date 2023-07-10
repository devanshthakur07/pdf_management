const mongoose = require("mongoose");
const User = require("./User");

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  path: {
    type: String,
    required: true
  },
  sharedTo: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    }
  ]
});

// Creating a Model from that Schema
const File = mongoose.model("File", fileSchema);

// Exporting the Model to use it in app.js File.
module.exports = File;