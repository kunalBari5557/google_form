const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  fieldType: {
    type: String,
  },
  question: {
    type: String,
  },
  placeHolder: {
    type: String,
  },
  options: {
    type: [String], // Array of options
  },
  isRequired: {
    type: Boolean,
  },
});

const test_master = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    response: {
      type: [responseSchema], // Array of response items
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("test_master", test_master, "test_master");

