const ARRAY_KEYS = {
  LABEL: 'LABEL',
  VALUE: 'VALUE',
  COMPONENT: 'COMPONENT',
  DATA: 'DATA',
  VALIDATION: 'VALIDATION',
};

const NODE_ENVS = {
  development: 'development',
  production: 'production',
};

const MAPPER_NAMESPACES = { products: 'products', categories: 'categories' };

const QUERIES = {
  getFilteredProductsWithCategories: 'getFilteredProductsWithCategories',
  getAllCategories: 'getAllCategories',
};

module.exports = {
  ARRAY_KEYS,
  NODE_ENVS,
  MAPPER_NAMESPACES,
  QUERIES,
};
