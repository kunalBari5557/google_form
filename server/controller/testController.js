const Joi = require("joi");
const userTestForm = require("../models/test");

module.exports = {
  create: async (req, res) => {
    try {
      const { formId, response } = req.body;

      const schema = Joi.object({
        formId: Joi.string().required(),
        response: Joi.array().items(
          Joi.object({
            fieldType: Joi.string().required(),
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string()),
          })
        )
      });

      const result = schema.validate({
        formId,
        response,
      });

      if (result.error) {
        return res.status(400).json({
          message: result.error.details[0].message,
        });
      }

      const form = await userTestForm.create({
        formId: formId,
        response,
      });

      return res.status(200).json({
        form: form,
        message: "Form filled successfully by user.",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong.", error });
    }
  },

  list: async (req, res) => {
    try {
      const formId = req.params.formId;
      const formResponse = await userTestForm.findOne({ formId });

      if (!formResponse) {
        return res.status(404).json({ message: 'Form response not found.' });
      }

      return res.status(200).json(formResponse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }
};
