const Joi = require("joi");
const formCreateByAdmin = require("../models/formCreateByAdmin");

module.exports = {
  create: async (req, res) => {
    try {
      const { title, description, response } = req.body;

      const schema = Joi.object({
        title: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        response: Joi.array().items(
          Joi.object({
            fieldType: Joi.string().required(),
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string()),
          })
        ),
      });

      const result = schema.validate({
        title,
        description,
        response,
      });

      if (result.error) {
        return res.status(400).json({
          message: result.error.details[0].message,
        });
      }

      const form = await formCreateByAdmin.create({
        title,
        description,
        response,
      });

      return res.status(200).json({
        form: form,
        message: "Form created successfully.",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong.", error });
    }
  },

  list: async (req, res) => {
    try {
      const forms = await formCreateByAdmin.find();

      return res.status(200).json({
        forms,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong.", error });
    }
  },

  listId: async (req, res) => {
    try {
      const id = req.params.id;

      // Fetch data based on the "id" parameter (replace with your actual query conditions)
      const forms = await formCreateByAdmin.find({ _id: id });

      if (forms.length === 0) {
        return res.status(404).json({ message: "Form not found" });
      }

      return res.status(200).json({
        form: forms[0], // Assuming you expect one form with the provided ID
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong.", error });
    }
  },
};
