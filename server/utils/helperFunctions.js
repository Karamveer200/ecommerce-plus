require('dotenv').config();

const getDynamicEnv = async (key) => {
  return key;
};

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

module.exports = {
  getDynamicEnv,
  formatGetAllProducts,
  formatGetAllCategories,
};
