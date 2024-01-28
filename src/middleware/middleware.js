const { ResponseTemplate } = require("../helper/template.helper");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    let resp = ResponseTemplate(null, "user unauthorized", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const user = await jwt.verify(authorization, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "user not authorized", null, 401);
    res.status(401).json(resp);
    return;
  }
}

async function Admin(req, res, next) {
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
}

function midd_register(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("USER", "ADMIN").required(),
    identity_type: Joi.string().valid("KTP", "SIM").required(),
    identity_number: Joi.string().min(14).required(),
    address: Joi.string().required(),
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
}

function midd_login(req, res, next) {
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
}

function midd_forget(req, res, next) {
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
}

function midd_Update(req, res, next) {
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
}

function midd_adminGet(req, res, next) {
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
}

function midd_bank_accountInsert(req, res, next) {
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
}

function midd_bank_accountGet(req, res, next) {
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
}

function midd_bank_accountUpdate(req, res, next) {
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
}

function midd_bank_accountAdminInsert(req, res, next) {
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
}

function midd_bank_accountAdminGet(req, res, next) {
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
}

function midd_bank_accountAdminUpdate(req, res, next) {
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
}

function midd_trasactionInsert(req, res, next) {
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
}

function midd_trasactionGet(req, res, next) {
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
}

function midd_trasactionAdminGet(req, res, next) {
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
}

function midd_trasactionAdminUpdate(req, res, next) {
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
}

module.exports = {
  Auth,
  Admin,
  midd_id,
  midd_register,
  midd_login,
  midd_forget,
  midd_Update,
  midd_adminGet,
  midd_bank_accountInsert,
  midd_bank_accountGet,
  midd_bank_accountUpdate,
  midd_bank_accountAdminInsert,
  midd_bank_accountAdminGet,
  midd_bank_accountAdminUpdate,
  midd_trasactionInsert,
  midd_trasactionGet,
  midd_trasactionAdminGet,
  midd_trasactionAdminUpdate,
};
