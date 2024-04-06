const { getFilteredProductsWithCategories } = require('../services/products');

const { formatGetAllProducts } = require('../utils/helperFunctions');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const { searchInput, sortKey, sortOrder, categoryType } = req.query;
    const params = {
      searchInput: searchInput || '',
      sortKey: sortKey || 'name',
      sortOrder: sortOrder || 'ASC',
      categoryType: categoryType || '',
    };

    const result = await getFilteredProductsWithCategories(params);

    const rows = result?.rows;

    res.send(formatGetAllProducts(rows));
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
