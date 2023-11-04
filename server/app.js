const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();
const config = require("./config");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/test", require("./route/index"));

mongoose
    .connect(config.database, {
        useUnifiedTopology: false,
        useNewUrlParser: true,
    })
    .then(async () => {
        console.log("Successfully connected database...");
    })
    .catch((err) => {
        console.log("Sorry can not connect with database...", { err });
    });

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
