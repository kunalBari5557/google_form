const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  fieldType: {
    type: String,
  },
  question: {
    type: String,
  },
  options: {
    type: [String], // Array of options
  },
});

const testFormByUser = mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("testFormByUser", testFormByUser, "testFormByUser");

