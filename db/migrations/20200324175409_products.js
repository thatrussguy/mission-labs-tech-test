exports.up = async function(knex) {
  await knex.schema.createTable("products", table => {
    table.increments("product_id").primary();
    table.string("name").notNullable();
    table.float("price").notNullable();
    table.string("category").notNullable();
    table.json("sizes").notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("products");
};
