const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    // username must be an email
    body("name", "Name has to be longer than 3 characters.").isLength({
      min: 3
    }),
    body("name", "Name can't have whitespaces in it.").custom(
      value => !/\s/.test(value)
    ),
    body("email", "Invalid email address.").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password needs to be 8 characters long.").isLength({
      min: 8
    })
  ];
};

const uservalidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    erro: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  uservalidate
};
