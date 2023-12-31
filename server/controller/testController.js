const userTestForm = require("../models/test");

module.exports = {
  create: async (req, res) => {
    try {
      const { formId, response } = req.body;
  
      // Flatten the options array
      const flattenedOptions = response[0].options.flat();
  
      const form = await userTestForm.create({
        formId: formId,
        response: [{ ...response[0], options: flattenedOptions }],
      });
  
      return res.status(200).json({
        form: form,
        message: "Form filled successfully by the user.",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong.", error });
    }
  }
  ,

  list: async (req, res) => {
    try {
      const forms = await userTestForm.find();
      return res.status(200).json({
        forms: forms,
        message: "List of forms retrieved successfully.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong.", error });
    }
  },
};
