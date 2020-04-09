import { NextFunction, Request, Response } from "express";
import { Product } from "../types/product";

const {
  selectProducts,
  selectProductById,
  updateProductById,
  insertProduct,
  removeProductById,
} = require("../models/products");

exports.getProducts = (req: Request, res: Response, next: NextFunction) => {
  selectProducts(req.query)
    .then((products: Product[]) => {
      res.send({
        products: products.map(({ sizes, ...rest }) => ({
          sizes: JSON.parse(sizes),
          ...rest,
        })),
      });
    })
    .catch(next);
};
exports.getProductById = (req: Request, res: Response, next: NextFunction) => {
  const { product_id } = req.params;
  selectProductById(product_id)
    .then((product: Product) => {
      if (!product)
        res.status(404).send({ msg: `No such product: ${product_id}` });
      else {
        product.sizes = JSON.parse(product.sizes);
        res.send({ product });
      }
    })
    .catch(next);
};
exports.patchProductById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { product_id } = req.params;
  updateProductById(product_id, req.body)
    .then(() => selectProductById(product_id))
    .then((product: Product) => {
      if (!product)
        res.status(404).send({ msg: `No such product: ${product_id}` });
      else {
        product.sizes = JSON.parse(product.sizes);
        res.send(product);
      }
    })
    .catch(next);
};
exports.postProduct = (req: Request, res: Response, next: NextFunction) => {
  insertProduct(req.body)
    .then((product: Product) => {
      product.sizes = JSON.parse(product.sizes);
      res.status(201).send(product);
    })
    .catch(next);
};
exports.deleteProductById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { product_id } = req.params;
  removeProductById(product_id)
    .then((rowsAffected: number) => {
      if (rowsAffected === 1) res.sendStatus(204);
      else res.status(404).send({ msg: `No such product: ${product_id}` });
    })
    .catch(next);
};
