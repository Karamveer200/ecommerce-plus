const { getFilteredProductsWithCategories, updateProductQuantities } = require('../services/products');

const { formatGetAllProducts, getFilteredProductsParams } = require('../utils/helperFunctions');
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

router.post('/confirmOrder', async (req, res) => {
  try {
    const payload = req.body;
    await updateProductQuantities({ payload });
    res.send('ok');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
