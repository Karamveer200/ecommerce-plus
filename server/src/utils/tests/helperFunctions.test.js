const { formatGetAllProducts, formatGetAllCategories } = require('../helperFunctions');

describe('formatGetAllProducts function', () => {
  it('should format an array of products correctly', () => {
    const rows = [
      {
        product_id: 1,
        product_name: 'Product 1',
        image_identifier: 'img1',
        category_type: 'type1',
        category_title: 'Title 1',
        quantity: 10,
        stars: 4,
        price: 20,
      },
    ];

    const expectedOutput = [
      {
        id: 1,
        name: 'Product 1',
        imageIdentifier: 'img1',
        categoryType: 'type1',
        categoryTitle: 'Title 1',
        quantity: 10,
        stars: 4,
        price: 20,
      },
    ];
    const result = formatGetAllProducts(rows);
    expect(result).toEqual(expectedOutput);
  });
});

describe('formatGetAllCategories function', () => {
  it('should format an array of categories correctly', () => {
    const rows = [
      {
        category_id: 1,
        title: 'Category 1',
        type: 'type1',
      },
    ];
    const expectedOutput = [
      {
        id: 1,
        title: 'Category 1',
        type: 'type1',
      },
    ];
    const result = formatGetAllCategories(rows);
    expect(result).toEqual(expectedOutput);
  });
});
