const { getFilteredProductsWithCategories, getAllCategories, updateProductQuantities } = require('../products');
const { executeQuery } = require('../../utils/database/database');
const { MAPPER_NAMESPACES, QUERIES } = require('../../utils/constants');

jest.mock('../../utils/database/database', () => ({
  executeQuery: jest.fn(),
}));

describe('getFilteredProductsWithCategories function', () => {
  afterEach(() => {
    executeQuery.mockClear();
  });

  it('should call executeQuery with correct arguments', async () => {
    const params = { category: 'ELECTRONICS', sortKey: 'name', sortOrder: 'ASC', searchInput: 'Abc' };

    await getFilteredProductsWithCategories(params);

    expect(executeQuery).toHaveBeenCalledWith(
      MAPPER_NAMESPACES.products,
      QUERIES.getFilteredProductsWithCategories,
      params
    );
  });
});

describe('getAllCategories function', () => {
  afterEach(() => {
    executeQuery.mockClear();
  });

  it('should call executeQuery with correct arguments', async () => {
    await getAllCategories();
    expect(executeQuery).toHaveBeenCalledWith(MAPPER_NAMESPACES.categories, QUERIES.getAllCategories);
  });
});

describe('updateProductQuantities function', () => {
  afterEach(() => {
    executeQuery.mockClear();
  });

  it('should call executeQuery with correct arguments', async () => {
    const params = [
      { id: 123, purchaseQuantity: 2 },
      { id: 81, purchaseQuantity: 17 },
    ];

    await updateProductQuantities(params);

    expect(executeQuery).toHaveBeenCalledWith(MAPPER_NAMESPACES.products, QUERIES.updateProductQuantities, params);
  });
});
