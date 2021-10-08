/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 17-09-2021
 * @desc Schema Validation of data
 */

const Joi = require("joi");

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

const validateDataEnc = (data) => {
  const schema = Joi.object({
    message: Joi.string()
      .trim()
      .required()
      .error(new Error("Message is required")),
    secret: Joi.string()
      .trim()
      .required()
      .pattern(new RegExp(/^[\w\-]+$/i))
      .min(6)
      .error(
        new Error(
          "Secret key is required and length must be more than 6 & contains numbers & caracters"
        )
      ),
  });
  return schema.validate(data, options);
};

const validateDataDec = (data) => {
  const schema = Joi.object({
    encMessage: Joi.string()
      .trim()
      .required()
      .error(new Error("Encrypted Message is required")),
    secret: Joi.string()
      .trim()
      .required()
      .pattern(new RegExp(/^[\w\-]+$/i))
      .min(6)
      .error(
        new Error(
          "Secret key length must be more than 6 & contains numbers & caracters"
        )
      ),
  });
  return schema.validate(data, options);
};

module.exports = { validateDataEnc, validateDataDec };
