const connection = require("../db/connection");

const { NODE_ENV } = process.env;

const selectProducts = ({ priceFrom, priceTo }) => {
  return connection("products").modify(query => {
    if (priceFrom) query.where("products.price", ">=", priceFrom);
    if (priceTo) query.where("products.price", "<=", priceTo);
  });
};
const selectProductById = productId => {
  return connection("products")
    .select("products.*")
    .where({ "products.product_id": productId })
    .first();
};
const updateProductById = (product_id, body) => {
  if (body.sizes) body.sizes = JSON.stringify(body.sizes);
  return connection("products")
    .where({ product_id })
    .update({ ...body });
};
const insertProduct = body => {
  body.sizes = JSON.stringify(body.sizes);
  return NODE_ENV === "production"
    ? connection("products")
        .insert({ ...body })
        .then(([{ product_id }]) => selectProductById(product_id))
    : connection("products")
        .insert({ ...body })
        .then(([product_id]) => selectProductById(product_id));
};
const removeProductById = product_id => {
  return connection("products")
    .delete()
    .where({ product_id });
};

module.exports = {
  selectProducts,
  selectProductById,
  updateProductById,
  insertProduct,
  removeProductById
};
