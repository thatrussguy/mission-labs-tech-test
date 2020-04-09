import { QueryBuilder } from "knex";
import { Product } from "../types/product";

const connection = require("../db/connection");

const { NODE_ENV } = process.env;

const selectProducts = ({
  priceFrom,
  priceTo,
}: {
  priceFrom: string;
  priceTo: string;
}) => {
  return connection("products").modify((query: QueryBuilder) => {
    if (priceFrom) query.where("products.price", ">=", priceFrom);
    if (priceTo) query.where("products.price", "<=", priceTo);
  });
};
const selectProductById = (productId: number) => {
  return connection("products")
    .select("products.*")
    .where({ "products.product_id": productId })
    .first();
};
const updateProductById = (product_id: number, body: Product) => {
  if (body.sizes) body.sizes = JSON.stringify(body.sizes);
  return connection("products")
    .where({ product_id })
    .update({ ...body });
};
const insertProduct = (body: Product) => {
  body.sizes = JSON.stringify(body.sizes);
  return NODE_ENV === "production"
    ? connection("products")
        .insert({ ...body })
        .returning("*")
        .then(([{ product_id }]: [{ product_id: number }]) =>
          selectProductById(product_id)
        )
    : connection("products")
        .insert({ ...body })
        .then(([product_id]: [number]) => selectProductById(product_id));
};
const removeProductById = (product_id: number) => {
  return connection("products").delete().where({ product_id });
};

module.exports = {
  selectProducts,
  selectProductById,
  updateProductById,
  insertProduct,
  removeProductById,
};
