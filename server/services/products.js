const { MAPPER_NAMESPACES, QUERIES } = require('../utils/constants');
const { executeQuery } = require('../utils/database/database');

const updateProductById = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.updateProductById, params);

const getAllProductsWithCategories = async () =>
  await executeQuery(MAPPER_NAMESPACES.products, QUERIES.getAllProductsWithCategories);

const getAllCategories = async () => await executeQuery(MAPPER_NAMESPACES.categories, QUERIES.getAllCategories);

module.exports = {
  updateProductById,
  getAllProductsWithCategories,
  getAllCategories,
};
