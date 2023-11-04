const mongoose = require("mongoose");
const language_master = mongoose.Schema(
    {
        testId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "language_master",
    language_master,
    "language_master"
);
