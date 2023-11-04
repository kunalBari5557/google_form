const Joi = require("joi");
const Test = require("../models/test");
const test_master = require("../models/test");

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
                placeHolder: Joi.string().allow(""),
                options: Joi.array().items(Joi.string()),
                isRequired: Joi.boolean(),
              })
            )      });
    
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
    
          const form = await test_master.create({
            title,
            description,
            response,
          });
    
          return res.status(200).json({
            message: "Form created successfully.",
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ message: "Something went wrong.", error });
        }
      },

    list: async (req, res) => {
        try {
            const tests = await Test.aggregate([
                {
                    $lookup: {
                        from: "language_master",
                        localField: "testId",
                        foreignField: "_id",
                        as: "language",
                    },
                },
            ]);

            return res.status(200).json({
                tests: tests,
            });
        } catch (error) {
            console.log(error);

            return res
                .status(400)
                .json({ message: "Something went wrong.", error });
        }
    },
};
