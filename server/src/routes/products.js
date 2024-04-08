const {
  getFilteredProductsWithCategories,
  updateProductQuantities,
  getOutOfStockProductId,
} = require('../services/products');

const { formatGetAllProducts, getFilteredProductsParams } = require('../utils/helperFunctions');
const { confirmOrderValidation } = require('../utils/validations');

const { SERVER_REJECTIONS } = require('../utils/constants');

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const { searchInput, sortKey, sortOrder, categoryType, minimumQuantity } = req.query;
    const params = getFilteredProductsParams({ searchInput, sortKey, sortOrder, categoryType, minimumQuantity });

    const result = await getFilteredProductsWithCategories(params);

    const rows = result?.rows;

    res.send(formatGetAllProducts(rows));
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/confirmOrder', confirmOrderValidation, async (req, res) => {
  try {
    const payload = req.body;

    for (let i = 0; i < payload.length; i++) {
      const outOfStockId = await getOutOfStockProductId(payload[i]);
      const rows = outOfStockId?.rows;

      if (rows?.length) {
        throw new Error('INVALID_QUANTITY');
      }
    }

    await updateProductQuantities({ payload });
    res.send('ok');
  } catch (err) {
    err.message === SERVER_REJECTIONS.INVALID_QUANTITY
      ? res.status(400).send(SERVER_REJECTIONS.INVALID_QUANTITY)
      : res.status(500).send('Server Error');
  }
});

module.exports = router;
