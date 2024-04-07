const express = require('express');
const supertest = require('supertest');
const router = require('../categories');
const { executeQuery } = require('../../utils/database/database');
const { MAPPER_NAMESPACES, QUERIES } = require('../../utils/constants');

jest.mock('../../utils/database/database', () => ({
  executeQuery: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/', router);

describe('GET categories/all', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted categories', async () => {
    const expectedOutput = [
      {
        id: 1,
        title: 'Category 1',
        type: 'type1',
      },
    ];

    executeQuery.mockResolvedValueOnce({
      rows: [
        {
          category_id: 1,
          title: 'Category 1',
          type: 'type1',
        },
      ],
    });

    // request  endpoint
    const response = await supertest(app).get('/all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedOutput);

    expect(executeQuery).toHaveBeenCalledTimes(1);
    expect(executeQuery).toHaveBeenCalledWith(MAPPER_NAMESPACES.categories, QUERIES.getAllCategories);
  });

  it('handle errors', async () => {
    executeQuery.mockRejectedValueOnce(new Error());

    const response = await supertest(app).get('/all');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');

    expect(executeQuery).toHaveBeenCalledTimes(1);
  });
});
