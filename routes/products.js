const productsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  getProducts,
  getProductById,
  patchProductById,
  postProduct,
  deleteProductById
} = require("../controllers/products");

productsRouter
  .route("/")
  .get(getProducts)
  .post(postProduct)
  .all(methodNotAllowed);
productsRouter
  .route("/:product_id")
  .get(getProductById)
  .patch(patchProductById)
  .delete(deleteProductById)
  .all(methodNotAllowed);

module.exports = productsRouter;
