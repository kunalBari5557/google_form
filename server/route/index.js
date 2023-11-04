const express = require("express");
const testController = require("../controller/testController");
const formController = require("../controller/formController");

const router = express.Router();

router.post("/add", testController.create);
router.get("/list", testController.list);
router.post("/form/add", formController.create);
router.get("/form/list", formController.list);
router.get("/form/list/:id", formController.listId);


module.exports = router;
