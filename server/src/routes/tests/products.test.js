const express = require('express');
const supertest = require('supertest');
const router = require('../products');
const { executeQuery } = require('../../utils/database/database');
const { MAPPER_NAMESPACES, QUERIES, SERVER_REJECTIONS } = require('../../utils/constants');
const { getFilteredProductsParams } = require('../../utils/helperFunctions');

jest.mock('../../utils/database/database', () => ({
  executeQuery: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/', router);

describe('GET products/all', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted products with defaults filters', async () => {
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

    executeQuery.mockResolvedValueOnce({
      rows: [
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
      ],
    });

    // request  endpoint
    const response = await supertest(app).get('/all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedOutput);

    expect(executeQuery).toHaveBeenCalledTimes(1);
    expect(executeQuery).toHaveBeenCalledWith(
      MAPPER_NAMESPACES.products,
      QUERIES.getFilteredProductsWithCategories,
      getFilteredProductsParams({})
    );
  });

  it('should return formatted products with custom filters', async () => {
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

    executeQuery.mockResolvedValueOnce({
      rows: [
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
      ],
    });

    const filters = {
      searchInput: 'Abcde',
      sortKey: 'price',
      sortOrder: 'DESC',
      categoryType: 'CLOTHING',
      minimumQuantity: '10',
    };

    // request  endpoint
    const response = await supertest(app).get(
      '/all?searchInput=Abcde&sortKey=price&sortOrder=DESC&categoryType=CLOTHING&minimumQuantity=10'
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedOutput);

    expect(executeQuery).toHaveBeenCalledTimes(1);
    expect(executeQuery).toHaveBeenCalledWith(
      MAPPER_NAMESPACES.products,
      QUERIES.getFilteredProductsWithCategories,
      getFilteredProductsParams(filters)
    );
  });

  it('handle errors', async () => {
    executeQuery.mockRejectedValueOnce(new Error());

    const response = await supertest(app).get('/all');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');

    expect(executeQuery).toHaveBeenCalledTimes(1);
  });
});

describe('GET products/confirmOrder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should check confirmOrder', async () => {
    const body = [
      {
        id: 1,
        purchaseQuantity: 10,
      },
      {
        id: 32,
        purchaseQuantity: 5,
      },
    ];

    executeQuery.mockResolvedValueOnce();

    // request endpoint
    const response = await supertest(app).post('/confirmOrder').send(body);

    expect(response.status).toBe(200);
    expect(response.text).toBe('ok');

    expect(executeQuery).toHaveBeenCalledTimes(body.length + 1);

    body.forEach((item) => {
      expect(executeQuery).toHaveBeenCalledWith(MAPPER_NAMESPACES.products, QUERIES.getOutOfStockProductId, item);
    });

    expect(executeQuery).toHaveBeenCalledWith(MAPPER_NAMESPACES.products, QUERIES.updateProductQuantities, {
      payload: body,
    });
  });

  it('handle errors server', async () => {
    executeQuery.mockRejectedValueOnce(new Error());

    const response = await supertest(app).post('/confirmOrder');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');

    expect(executeQuery).toHaveBeenCalledTimes(1);
  });

  it('handle errors out of stock', async () => {
    const body = [
      {
        id: 1,
        purchaseQuantity: 10,
      },
      {
        id: 32,
        purchaseQuantity: 5,
      },
    ];

    executeQuery.mockResolvedValueOnce({ rows: ['dummy'] });

    // request endpoint
    const response = await supertest(app).post('/confirmOrder').send(body);

    expect(executeQuery).toHaveBeenCalledTimes(1);

    expect(response.status).toBe(400);
    expect(response.text).toBe(SERVER_REJECTIONS.INVALID_QUANTITY);
  });
});
