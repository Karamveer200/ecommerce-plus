const { MAPPER_NAMESPACES, QUERIES } = require('../utils/constants');
const { executeQuery } = require('../utils/database/database');

const getAllCategories = async () => await executeQuery(MAPPER_NAMESPACES.categories, QUERIES.getAllCategories);

const getFilteredProductsWithCategories = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.getFilteredProductsWithCategories, params);

const updateProductQuantities = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.updateProductQuantities, params);

module.exports = {
  getFilteredProductsWithCategories,
  getAllCategories,
  updateProductQuantities,
};
