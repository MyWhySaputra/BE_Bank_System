const { ResponseTemplate } = require("../../helpers/templateHelper");
const Joi = require("joi");

function midd_trasactionInsert(req, res, next) {
  try {
    const schema = Joi.object({
      source_bank_number: Joi.string().min(10).required(),
      destination_bank_number: Joi.string().min(10).required(),
      amount: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      let resp = ResponseTemplate(
        null,
        "invalid request",
        error.details[0].message,
        400
      );
      res.status(400).json(resp);
      return;
    }
    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

function midd_trasactionGet(req, res, next) {
  try {
    const schema = Joi.object({
      source_bank_number: Joi.string().min(10),
      destination_bank_number: Joi.string().min(10),
    });

    const { error } = schema.validate(req.query);

    if (error) {
      let resp = ResponseTemplate(
        null,
        "invalid request",
        error.details[0].message,
        400
      );
      res.status(400).json(resp);
      return;
    }
    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

function midd_trasactionAdminGet(req, res, next) {
  try {
    const schema = Joi.object({
      source_bank_number: Joi.string().min(10),
      destination_bank_number: Joi.string().min(10),
      amount: Joi.number(),
    });

    const { error } = schema.validate(req.query);

    if (error) {
      let resp = ResponseTemplate(
        null,
        "invalid request",
        error.details[0].message,
        400
      );
      res.status(400).json(resp);
      return;
    }
    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

function midd_trasactionAdminUpdate(req, res, next) {
  try {
    const schema = Joi.object({
      source_bank_number: Joi.string().min(10).allow(""),
      destination_bank_number: Joi.string().min(10).allow(""),
      amount: Joi.number().allow(""),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      let resp = ResponseTemplate(
        null,
        "invalid request",
        error.details[0].message,
        400
      );
      res.status(400).json(resp);
      return;
    }
    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  midd_trasactionInsert,
  midd_trasactionGet,
  midd_trasactionAdminGet,
  midd_trasactionAdminUpdate,
};
