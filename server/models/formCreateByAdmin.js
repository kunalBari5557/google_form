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

const formCreateByAdmin = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    response: {
      type: [responseSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "formCreateByAdmin",
  formCreateByAdmin,
  "formCreateByAdmin"
);
