const {
  selectProducts,
  selectProductById,
  updateProductById,
  insertProduct,
  removeProductById
} = require("../models/products");

exports.getProducts = (req, res, next) => {
  selectProducts(req.query)
    .then(products => {
      res.send({
        products: products.map(({ sizes, ...rest }) => ({
          sizes: JSON.parse(sizes),
          ...rest
        }))
      });
    })
    .catch(next);
};
exports.getProductById = (req, res, next) => {
  const { product_id } = req.params;
  selectProductById(product_id)
    .then(product => {
      if (!product)
        res.status(404).send({ msg: `No such product: ${product_id}` });
      else {
        product.sizes = JSON.parse(product.sizes);
        res.send(product);
      }
    })
    .catch(next);
};
exports.patchProductById = (req, res, next) => {
  const { product_id } = req.params;
  updateProductById(product_id, req.body)
    .then(() => selectProductById(product_id))
    .then(product => {
      if (!product)
        res.status(404).send({ msg: `No such product: ${product_id}` });
      else {
        product.sizes = JSON.parse(product.sizes);
        res.send(product);
      }
    })
    .catch(next);
};
exports.postProduct = (req, res, next) => {
  insertProduct(req.body)
    .then(product => {
      product.sizes = JSON.parse(product.sizes);
      res.status(201).send(product);
    })
    .catch(next);
};
exports.deleteProductById = (req, res, next) => {
  const { product_id } = req.params;
  removeProductById(product_id)
    .then(rowsAffected => {
      if (rowsAffected === 1) res.sendStatus(204);
      else res.status(404).send({ msg: `No such product: ${product_id}` });
    })
    .catch(next);
};
