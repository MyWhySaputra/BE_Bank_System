const { ResponseTemplate } = require("../../helpers/templateHelper");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      let resp = ResponseTemplate(null, "user unauthorized", null, 400);
      res.status(400).json(resp);
      return;
    }

    const user = await jwt.verify(authorization, process.env.SECRET_KEY);
    req.user = user;
    
    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "user not authorized", null, 401);
    res.status(401).json(resp);
    return;
  }
}

function Admin(req, res, next) {
  try {
    if (req.user.role !== "ADMIN") {
      let resp = ResponseTemplate(null, "you are not admin", null, 404);
      res.status(404).json(resp);
      return;
    }
    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

function midd_id(req, res, next) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = schema.validate(req.params);
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

function midd_register(req, res, next) {
  try {
    const schema = Joi.object({
      name: Joi.string().max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("USER", "ADMIN").required(),
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

function midd_login(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
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

function midd_forget(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
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
  Auth,
  Admin,
  midd_id,
  midd_register,
  midd_login,
  midd_forget,
};
