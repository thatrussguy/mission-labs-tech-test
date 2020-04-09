import Knex from "knex";
import { Product } from "../../types/product";

const faker = require("faker");

faker.seed(123);

const createFakeProduct = () => ({
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  category: faker.commerce.department(),
  sizes: JSON.stringify(["S", "M", "L"]),
});

exports.seed = function (knex: Knex) {
  // Create fake product data
  const fakeProducts: Product[] = [];
  const desiredFakeProducts = 100;
  for (let i = 0; i < desiredFakeProducts; i++) {
    fakeProducts.push(createFakeProduct());
  }

  // Deletes ALL existing entries
  return knex("products")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("products").insert(fakeProducts);
    });
};
