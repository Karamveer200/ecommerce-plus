const MAPPER_NAMESPACES = { products: 'products', categories: 'categories' };

const QUERIES = {
  getFilteredProductsWithCategories: 'getFilteredProductsWithCategories',
  getAllCategories: 'getAllCategories',
  updateProductQuantities: 'updateProductQuantities',
  getOutOfStockProductId: 'getOutOfStockProductId',
};

const SERVER_REJECTIONS = {
  INVALID_QUANTITY: 'INVALID_QUANTITY',
};

module.exports = {
  MAPPER_NAMESPACES,
  QUERIES,
  SERVER_REJECTIONS,
};
