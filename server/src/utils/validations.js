const { validationResult, body } = require('express-validator');

const confirmOrderValidation = [
  body().isArray().withMessage('Input must be an array'),
  body('*').isObject().withMessage('Each element of the array must be an object'),
  body('*').custom((value) => {
    if (!value.hasOwnProperty('id') || typeof value.id !== 'number') {
      throw new Error('Invalid "id"');
    }
    if (
      !value.hasOwnProperty('purchaseQuantity') ||
      typeof value.purchaseQuantity !== 'number' ||
      value.purchaseQuantity < 1
    ) {
      throw new Error('Invalid "purchaseQuantity"');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { confirmOrderValidation };
