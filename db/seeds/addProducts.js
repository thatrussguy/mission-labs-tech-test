const faker = require("faker");

const createFakeProduct = () => ({
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  category: faker.commerce.department(),
  sizes: JSON.stringify(["S", "M", "L"])
});

exports.seed = function(knex) {
  // Create fake product data
  const fakeProducts = [];
  const desiredFakeProducts = 100;
  for (let i = 0; i < desiredFakeProducts; i++) {
    fakeProducts.push(createFakeProduct());
  }

  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert(fakeProducts);
    });
};
