const { ResponseTemplate } = require("../../helpers/templateHelper");
const Joi = require("joi");

function midd_Update(req, res, next) {
  try {
    const schema = Joi.object({
      name: Joi.string().max(255).allow(""),
      email: Joi.string().email().allow(""),
      password: Joi.string().min(6).allow(""),
      profile_picture: Joi.string().allow(""),
      identity_type: Joi.string().valid("KTP", "SIM").allow(""),
      identity_number: Joi.string().min(14).allow(""),
      address: Joi.string().allow(""),
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

function midd_adminGet(req, res, next) {
  try {
    const schema = Joi.object({
      name: Joi.string().max(255),
      email: Joi.string().email(),
      identity_type: Joi.string().valid("KTP", "SIM"),
      identity_number: Joi.string().min(14),
      address: Joi.string(),
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

module.exports = {
  midd_Update,
  midd_adminGet,
};
