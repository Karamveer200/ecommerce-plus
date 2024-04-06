const { MAPPER_NAMESPACES, QUERIES } = require('../utils/constants');
const { executeQuery } = require('../utils/database/database');

const updateProductById = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.updateRecipeById, params);

const getAllProductsWithCategories = async () =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.getAllProductsWithCategories);

module.exports = {
  updateProductById,
  getAllProductsWithCategories,
};
