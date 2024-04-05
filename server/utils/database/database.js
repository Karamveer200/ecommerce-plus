const knex = require('knex');
const fs = require('fs');

const { getPoolConfigurations } = require('./dbConfig');
const mybatisMapper = require('mybatis-mapper');

let connection;

const initializePgConnection = async () => {
  if (connection) {
    return connection;
  }

  try {
    const poolConfig = await getPoolConfigurations();
    connection = await knex(poolConfig);
    console.log('Database connected successfully');

    return connection;
  } catch (error) {
    console.log(`Database connection error - ${error}`);
    throw error;
  }
};

const closePool = async () => {
  try {
    console.log('Closing connection pool');
    await connection.destroy();
    console.log('Connection pool closed');
  } catch (error) {
    console.log('Error closing pool -', error);
    throw error;
  }
};

const getDbConnection = async () => {
  try {
    if (connection) {
      return connection;
    } else {
      return initializePgConnection();
    }
  } catch (err) {
    console.log('Database connection error: ', err);
    throw new Error('DATABASE_SQL_ERROR');
  }
};

const executeQuery = async (mapperNamespace, sqlId, params = {}) => {
  console.log('Called SQL Id - ', sqlId, ' with param - ', params);

  try {
    const connection = await getDbConnection();
    let sql = await mybatisMapper.getStatement(mapperNamespace, sqlId, params);
    sql = sql?.replace(/(\n|\r|\t)/gm, ' ').trim();

    console.log('Query Called ->   ', sql);
    let result = await connection.raw(sql);
    console.log('Query result ->   ', result?.rows);

    return result;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    throw new Error();
  }
};

const executeDbSetupQuery = async (mapperNamespace, sqlId, params = {}) => {
  console.log('Executing Db Setup Query');

  try {
    const connection = await getDbConnection();
    // Define your SQL query for creating schema and tables
    const createSchemaAndTablesSQL = `
 CREATE SCHEMA IF NOT EXISTS shop_zone;

 CREATE TABLE IF NOT EXISTS shop_zone.CATEGORY (
   category_id   SERIAL PRIMARY KEY,
   title         TEXT NOT NULL,
   type          TEXT NOT NULL,
   created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE IF NOT EXISTS shop_zone.PRODUCTS (
   product_id SERIAL PRIMARY KEY,
   category_id     INTEGER NOT NULL,
   name          TEXT NOT NULL,
   quantity      TEXT NOT NULL,
   image_identifier   TEXT NOT NULL,
   stars   INTEGER NOT NULL,
   FOREIGN KEY (category_id) REFERENCES shop_zone.CATEGORY(category_id)
 );
`;

    // Execute the SQL query
    await connection.raw(createSchemaAndTablesSQL);
    console.log('Schema and tables created/verified successfully');
  } catch (error) {
    console.log(`Database Error: ${error}`);
    throw new Error();
  }
};

const loadBatisMappers = () => {
  let files = fs.readdirSync(`../server/mappers`);

  let mappers = files.map((file) => {
    let filepath = `../server/mappers/${file}`;
    console.log(`loading mapper: ${filepath}`);
    return filepath;
  });

  mybatisMapper.createMapper(mappers);
  console.log(`Mappers initialized successfully`);
};

module.exports = { initializePgConnection, executeQuery, loadBatisMappers, executeDbSetupQuery, closePool };
