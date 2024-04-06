const { getAllCategories } = require('../services/products');

const { formatGetAllCategories } = require('../utils/helperFunctions');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const result = await getAllCategories();
    const rows = result?.rows;

    res.send(formatGetAllCategories(rows));
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
