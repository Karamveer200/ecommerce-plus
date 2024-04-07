require('dotenv').config();

const formatGetAllProducts = (rows) =>
  rows.reduce((acc, item) => {
    acc.push({
      id: item.product_id,
      name: item.product_name,
      imageIdentifier: item.image_identifier,
      categoryType: item.category_type,
      categoryTitle: item.category_title,
      quantity: item.quantity,
      stars: item.stars,
      price: item.price,
    });

    return acc;
  }, []);

const formatGetAllCategories = (rows) =>
  rows.reduce((acc, item) => {
    acc.push({
      id: item.category_id,
      title: item.title,
      type: item.type,
    });

    return acc;
  }, []);

const getFilteredProductsParams = ({
  searchInput = '',
  sortKey = 'name',
  sortOrder = 'ASC',
  categoryType = '',
  minimumQuantity = 1,
}) => ({
  searchInput,
  sortKey,
  sortOrder,
  categoryType,
  minimumQuantity,
});


module.exports = {
  formatGetAllProducts,
  formatGetAllCategories,
  getFilteredProductsParams,
};
