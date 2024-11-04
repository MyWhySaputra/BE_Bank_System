const { ResponseTemplate } = require("../../helpers/templateHelper");
const Joi = require("joi");

function midd_bank_accountInsert(req, res, next) {
  try {
    const schema = Joi.object({
      bank_name: Joi.string().max(255).required(),
      bank_account_number: Joi.string().min(10).required(),
      balance: Joi.number().required(),
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

function midd_bank_accountGet(req, res, next) {
  try {
    const schema = Joi.object({
      bank_name: Joi.string().max(255),
      bank_account_number: Joi.string().min(10),
      balance: Joi.number(),
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

function midd_bank_accountUpdate(req, res, next) {
  try {
    const schema = Joi.object({
      bank_name: Joi.string().max(255).allow(""),
      bank_account_number: Joi.string().min(10).allow(""),
      balance: Joi.number().allow(""),
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

function midd_bank_accountAdminInsert(req, res, next) {
  try {
    const schema = Joi.object({
      user_id: Joi.number().required(),
      bank_name: Joi.string().max(255).required(),
      bank_account_number: Joi.string().min(10).required(),
      balance: Joi.number().required(),
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

function midd_bank_accountAdminGet(req, res, next) {
  try {
    const schema = Joi.object({
      user_id: Joi.number(),
      bank_name: Joi.string().max(255),
      bank_account_number: Joi.string().min(10),
      balance: Joi.number(),
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

function midd_bank_accountAdminUpdate(req, res, next) {
  try {
    const schema = Joi.object({
      user_id: Joi.number().allow(""),
      bank_name: Joi.string().max(255).allow(""),
      bank_account_number: Joi.string().min(10).allow(""),
      balance: Joi.number().allow(""),
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
  midd_bank_accountInsert,
  midd_bank_accountGet,
  midd_bank_accountUpdate,
  midd_bank_accountAdminInsert,
  midd_bank_accountAdminGet,
  midd_bank_accountAdminUpdate,
};
