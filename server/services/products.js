const { MAPPER_NAMESPACES, QUERIES } = require('../utils/constants');
const { executeQuery } = require('../utils/database/database');

const updateProductById = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.updateProductById, params);

const getFilteredProductsWithCategories = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.getFilteredProductsWithCategories, params);

const getAllCategories = async () => await executeQuery(MAPPER_NAMESPACES.categories, QUERIES.getAllCategories);

module.exports = {
  updateProductById,
  getFilteredProductsWithCategories,
  getAllCategories,
};
