# mission-labs-tech-test

[Project on Heroku](https://russ-mission-labs-tech-test.herokuapp.com/products)

Node-based REST API that has CRUD methods to create, read,
update and delete a set of products.

Uses a SQLite database for development/testing, and PostgreSQL for production.

## Getting Started

### Set up a local copy to try out the API

Clone the project

```bash
git clone https://github.com/thatrussguy/mission-labs-tech-test.git
```

Install dependencies

```bash
npm install
```

Run tests

```bash
npm test
```

Set up database

```bash
npm run migrate-latest
```

Seed database

```bash
npm run seed
```

Start the app locally

```bash
npm run start
```

The app should now running on [http://localhost:9090](http://localhost:9090)

## Using the API

The following endpoints are available

```http
GET /products
```

### Responds with

- an array of product objects, each of which has the following properties:
  - `category`
  - `name`
  - `price`
  - `product_id`
  - `sizes`

### Accepts queries

- `priceFrom`, which filters the products by minimum price
- `priceTo`, which filters the products by maximum price

---

```http
POST /products
```

### Request body accepts

- an object with the following properties:
  - `category`
  - `name`
  - `price`
  - `sizes`

### Responds with

- the posted product

---

```http
GET /products/:product_id
```

### Responds with

- a product object, which has the following properties:
  - `category`
  - `name`
  - `price`
  - `product_id`
  - `sizes`

---

```http
PATCH /products/:product_id
```

### Request body accepts

- an object with any of the following properties:

  - `category`
  - `name`
  - `price`
  - `sizes`

### Responds with

- the updated product

---

```http
DELETE /products/:product_id
```

### Result

- delete product `product_id`

### Responds with

- status 204 and no content

---

## Prerequisites

- [Node.JS](https://nodejs.org)

## Built With

- [Node.JS](https://nodejs.org)
- [Express](https://expressjs.com/)
- [Knex.js](https://knexjs.org)
- [SQLite](https://www.sqlite.org)
- [PostgreSQL](https://www.postgresql.org/)
- [Faker](https://github.com/marak/Faker.js/)
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [SuperTest](https://github.com/visionmedia/supertest)
