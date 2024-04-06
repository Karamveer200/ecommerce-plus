const { getAllProductsWithCategories } = require('../services/products');

const { formatGetAllProducts } = require('../utils/helperFunctions');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const result = await getAllProductsWithCategories();
    const rows = result?.rows;

    res.send(formatGetAllProducts(rows));
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
