import { Product } from "../types/product";
import { ApiResponse } from "../types/apiResponse";
import { app } from "../app";

process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

// const app = require("../app");
const connection = require("../db/connection");
const request = supertest(app);

const { AUTH_KEY } = process.env;
const authHeaders = { "X-Token": AUTH_KEY };

describe("/", () => {
  beforeEach(() =>
    connection.migrate.latest().then(function () {
      return connection.seed.run();
    })
  );
  after(() => connection.destroy());

  describe("/products", () => {
    describe("GET", () => {
      it("200 - returns a list of products under key 'products'", () => {
        return request
          .get("/products")
          .expect(200)
          .then(({ body }: ApiResponse) => {
            expect(body).to.contain.keys("products");
            expect(body.products).to.be.an("array");
            expect(body.products[0]).to.contain.keys(
              "category",
              "name",
              "price",
              "product_id",
              "sizes"
            );
          });
      });
      it("200 - accepts a'priceFrom' query", () => {
        return request
          .get("/products?priceFrom=100")
          .expect(200)
          .then(({ body }: ApiResponse) => {
            expect(body.products.length).to.equal(85);
          });
      });
      it("200 - accepts a'priceTo' query", () => {
        return request
          .get("/products?priceTo=100")
          .expect(200)
          .then(({ body }: ApiResponse) => {
            expect(body.products.length).to.equal(8);
          });
      });
    });
    describe("POST", () => {
      it("201 - inserts a product with properties from request body and returns the new product", () => {
        return request
          .post("/products")
          .set(authHeaders)
          .send({
            name: "Test",
            price: 123,
            category: "Something",
            sizes: ["XS", "XL"],
          })
          .expect(201)
          .then(({ body }: ApiResponse) => {
            expect(body).to.contain.keys(
              "category",
              "name",
              "price",
              "product_id",
              "sizes"
            );
            expect(body.product_id).to.equal(101);
            expect(body.name).to.equal("Test");
            expect(body.price).to.equal(123);
            expect(body.category).to.equal("Something");
            expect(body.sizes).to.eql(["XS", "XL"]);
          });
      });
      it("400 - if missing any properties from req.body", () => {
        return request
          .post("/products")
          .set(authHeaders)
          .expect(400)
          .then(({ body }: ApiResponse) => {
            expect(body.msg).to.equal(
              "TypeError: `sqlite` does not support inserting default values"
            );
          });
      });
    });
    describe("/:product_id", () => {
      describe("GET", () => {
        it("200 - returns an product object under key 'product", () => {
          return request
            .get("/products/1")
            .expect(200)
            .then(({ body }: ApiResponse) => {
              expect(body).to.contain.keys("product");
              expect(body.product).to.be.an("object");
              expect(body.product).to.contain.keys(
                "category",
                "name",
                "price",
                "product_id",
                "sizes"
              );
            });
        });
        it("404 - if product_id is not in database", () => {
          return request
            .get("/products/1000")
            .expect(404)
            .then(({ body }: ApiResponse) => {
              expect(body.msg).to.equal("No such product: 1000");
            });
        });
      });
      describe("PATCH", () => {
        it("200 - updates the product with the provided properties", () => {
          return request
            .patch("/products/1")
            .set(authHeaders)
            .send({
              sizes: ["M"],
              name: "New Name",
            })
            .expect(200)
            .then(({ body }: ApiResponse) => {
              expect(body.sizes).to.eql(["M"]);
              expect(body.name).to.equal("New Name");
            });
        });
        it("400 - returns the unchanged product if body is blank", () => {
          return request
            .patch("/products/1")
            .set(authHeaders)
            .expect(400)
            .then(({ body }: ApiResponse) => {
              expect(body.msg).to.equal(
                "Error: Empty .update() call detected! Update data does not contain any values to update"
              );
            });
        });
        it("400 - if property to update is invalid", () => {
          return request
            .patch("/products/1")
            .set(authHeaders)
            .send({ size: ["M"] })
            .expect(400)
            .then(({ body }: ApiResponse) => {
              expect(body.msg).to.equal(
                "Error: update `products` set `size` = 'M' where `product_id` = '1' - SQLITE_ERROR: no such column: size"
              );
            });
        });
      });
      describe("DELETE", () => {
        it("204 - deletes the product and returns nothing", () => {
          return request
            .delete("/products/1")
            .set(authHeaders)
            .expect(204)
            .then(({ body }: ApiResponse) => {
              expect(body).to.deep.equal({});
            });
        });
        it("404 - if product_id is not in database", () => {
          return request
            .delete("/products/1000")
            .set(authHeaders)
            .expect(404)
            .then(({ body }: ApiResponse) => {
              expect(body.msg).to.equal("No such product: 1000");
            });
        });
      });
    });
  });
});
