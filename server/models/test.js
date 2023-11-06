const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  fieldType: {
    type: String,
  },
  question: {
    type: String,
  },
  options: {
    type: [String],
  },
});

const testFormByUser = mongoose.Schema(
  {
    response: {
      type: [responseSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "testFormByUser",
  testFormByUser,
  "testFormByUser"
);
